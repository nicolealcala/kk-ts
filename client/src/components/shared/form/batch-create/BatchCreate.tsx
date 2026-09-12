import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  type DefaultValues,
  FieldArray,
  type FieldArrayPath,
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useFieldArray,
  type UseFormReturn,
  useFormState,
} from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import BatchFormItem from "./BatchFormItem";
import FormHeader from "../FormHeader";
import ResetButton from "./ResetButton";
import FloatingMenu from "./FloatingMenu";

const FLOATING_MENU_GAP = 16;
const ACTIVE_FORM_THRESHOLD = 0.4;

type BatchCreateProps<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
> = {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;

  fieldArrayName: TName;

  defaultItem: FieldArray<TFieldValues, TName>;

  title: string;

  renderForm: (index: number) => React.ReactNode;

  getItemTitle?: (index: number) => React.ReactNode;

  onSubmit: SubmitHandler<TTransformedValues>;

  onError?: SubmitErrorHandler<TFieldValues>;

  onBack: () => void;
};

export default function BatchCreate<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
>({
  form,
  fieldArrayName,
  defaultItem,
  title,
  renderForm,
  getItemTitle,
  onSubmit,
  onError,
  onBack,
}: BatchCreateProps<TFieldValues, TContext, TTransformedValues, TName>) {
  const { control, handleSubmit, reset } = form;

  const { errors, isSubmitting, isDirty, isValid } = useFormState({
    control,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const [activeFormId, setActiveFormId] = useState<string | undefined>(
    fields[0]?.id,
  );
  const [activeFormElement, setActiveFormElement] =
    useState<HTMLDivElement | null>(null);

  const [expandedForms, setExpandedForms] = useState<Record<string, boolean>>(
    {},
  );

  const [floatingMenuPosition, setFloatingMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const formRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const floatingMenuRef = useRef<HTMLDivElement | null>(null);

  const previousFieldsLength = useRef(fields.length);

  const toggleForm = (id: string) => {
    setExpandedForms((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  const handleReset = () => {
    reset({
      [fieldArrayName]: [defaultItem],
    } as DefaultValues<TFieldValues>);
  };

  const setActiveForm = useCallback((id: string) => {
    setActiveFormId(id);
  }, []);

  const updateActiveFormFromViewport = useCallback(() => {
    const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;

    const viewportTop = headerBottom;
    const viewportBottom = window.innerHeight;

    let bestFormId: string | undefined;
    let bestVisibleRatio = 0;

    fields.forEach((field) => {
      if (!(expandedForms[field.id] ?? true)) {
        return;
      }

      const element = formRefs.current[field.id];

      if (!element) return;

      const rect = element.getBoundingClientRect();

      const visibleTop = Math.max(rect.top, viewportTop);
      const visibleBottom = Math.min(rect.bottom, viewportBottom);

      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const formHeight = rect.height;

      if (formHeight <= 0) return;

      const visibleRatio = visibleHeight / formHeight;

      if (visibleRatio > bestVisibleRatio) {
        bestVisibleRatio = visibleRatio;
        bestFormId = field.id;
      }
    });

    if (
      bestFormId &&
      bestVisibleRatio >= ACTIVE_FORM_THRESHOLD &&
      bestFormId !== activeFormId
    ) {
      setActiveFormId(bestFormId);
    }
  }, [fields, activeFormId, expandedForms]);

  const updateFloatingMenuPosition = useCallback(() => {
    if (!activeFormElement) {
      setFloatingMenuPosition(null);
      return;
    }

    const formRect = activeFormElement.getBoundingClientRect();

    const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;

    const menuRect = floatingMenuRef.current?.getBoundingClientRect();

    const menuHeight = menuRect?.height ?? 0;
    const menuWidth = menuRect?.width ?? 0;

    const viewportTop = headerBottom;
    const viewportBottom = window.innerHeight;

    /*
     * Hide the menu only when the entire active form
     * is outside the usable viewport.
     */
    const isFormVisible =
      formRect.bottom > viewportTop && formRect.top < viewportBottom;

    if (!isFormVisible) {
      setFloatingMenuPosition(null);
      return;
    }

    /*
     * Normally, the menu follows the top of the form.
     */
    const preferredTop = formRect.top;

    /*
     * Don't let the menu overlap the fixed header.
     */
    const minimumTop = viewportTop + FLOATING_MENU_GAP;

    /*
     * Keep the menu within the active form.
     */
    const maximumFormTop = formRect.bottom - menuHeight - FLOATING_MENU_GAP;

    /*
     * Don't let the menu extend outside the viewport.
     */
    const maximumViewportTop = viewportBottom - menuHeight - FLOATING_MENU_GAP;

    const maximumTop = Math.min(maximumFormTop, maximumViewportTop);

    const top =
      maximumTop >= minimumTop
        ? Math.min(Math.max(preferredTop, minimumTop), maximumTop)
        : minimumTop;

    /*
     * Place the menu to the right of the active form.
     */
    let left = formRect.right + FLOATING_MENU_GAP;

    /*
     * Keep the menu inside the viewport horizontally.
     */
    if (left + menuWidth > window.innerWidth - FLOATING_MENU_GAP) {
      left = window.innerWidth - menuWidth - FLOATING_MENU_GAP;
    }

    setFloatingMenuPosition({
      top,
      left,
    });
  }, [activeFormElement]);

  /*
   * Track scrolling of the actual content container.
   */
  useEffect(() => {
    if (!activeFormElement) {
      return;
    }

    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = requestAnimationFrame(() => {
        updateActiveFormFromViewport();
        updateFloatingMenuPosition();
        frameId = null;
      });
    };

    updateFloatingMenuPosition();

    scrollContainer.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [
    activeFormElement,
    updateFloatingMenuPosition,
    updateActiveFormFromViewport,
    expandedForms,
  ]);

  /*
   * Handle added/removed forms.
   */
  useEffect(() => {
    const previousLength = previousFieldsLength.current;
    const currentLength = fields.length;

    if (currentLength > previousLength) {
      const newField = fields[currentLength - 1];

      setActiveFormId(newField.id);
      setExpandedForms((prev) => ({
        ...prev,
        [newField.id]: true,
      }));

      requestAnimationFrame(() => {
        formRefs.current[newField.id]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    previousFieldsLength.current = currentLength;
  }, [fields]);

  const handleRemoveForm = (id: string) => {
    const index = fields.findIndex((field) => field.id === id);

    if (index === -1) return;

    const isLastItem = index === fields.length - 1;

    const nextActiveForm = isLastItem ? fields[index - 1] : fields[index + 1];

    if (!nextActiveForm) {
      remove(index);
      setActiveFormId(undefined);
      return;
    }

    setActiveFormId(nextActiveForm.id);
    remove(index);

    requestAnimationFrame(() => {
      const element = formRefs.current[nextActiveForm.id];
      const container = scrollContainerRef.current;

      if (!element || !container) return;

      if (isLastItem) {
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const headerBottom =
          headerRef.current?.getBoundingClientRect().bottom ?? 0;

        const targetTop = Math.max(headerBottom, containerRect.top);

        const scrollOffset = elementRect.top - targetTop - 24;

        container.scrollBy({
          top: scrollOffset,
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    });
  };

  return (
    <FormProvider {...form}>
      <Stack
        height="100%"
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/* Header */}
        <Box ref={headerRef}>
          <FormHeader
            isSubmitting={isSubmitting}
            isMultiple={fields.length > 1}
            title={title}
            onBack={onBack}
          />
        </Box>

        {/* Content */}
        <Box ref={scrollContainerRef} p={6} className="thin-scrollbar">
          <Box className="mx-auto w-full max-w-4xl space-y-6!">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Typography variant="h5" color="initial" fontWeight="semiBold">
                Add {title}
              </Typography>

              <ResetButton
                label={fields.length > 1 ? "Clear forms" : "Clear form"}
                isDirty={isDirty}
                handleReset={handleReset}
              />
            </Stack>

            {/* Forms */}
            <Stack spacing={3} position="relative">
              {fields.map((field, index) => {
                const fieldErrors = errors[fieldArrayName];

                const hasErrors = Boolean(
                  Array.isArray(fieldErrors) && fieldErrors[index],
                );

                const isOpen = expandedForms[field.id] ?? true;

                return (
                  <BatchFormItem
                    key={field.id}
                    index={index}
                    title={
                      getItemTitle ? getItemTitle(index) : `Item ${index + 1}`
                    }
                    isOpen={isOpen}
                    isActive={activeFormId === field.id}
                    hasErrors={hasErrors}
                    showIndex={fields.length > 1}
                    formRef={(element) => {
                      formRefs.current[field.id] = element;

                      /*
                       * Callback refs can run after the
                       * active ID has already changed.
                       */
                      if (field.id === activeFormId) {
                        setActiveFormElement(element);
                      }
                    }}
                    onClick={() => {
                      setActiveForm(field.id);
                      setExpandedForms((prev) => ({
                        ...prev,
                        [field.id]: true,
                      }));
                    }}
                    onToggle={() => toggleForm(field.id)}
                    onRemove={() => handleRemoveForm(field.id)}
                  >
                    {renderForm(index)}
                  </BatchFormItem>
                );
              })}
            </Stack>
          </Box>
        </Box>

        {/* Floating menu */}
        <FloatingMenu
          ref={floatingMenuRef}
          position={floatingMenuPosition}
          handleAdd={() => append(defaultItem)}
          handleDelete={() => {
            if (!activeFormId) {
              return;
            }

            handleRemoveForm(activeFormId);
          }}
          isExpanded={
            activeFormId ? (expandedForms[activeFormId] ?? true) : false
          }
          handleToggle={() => {
            if (!activeFormId) return;

            setExpandedForms((prev) => ({
              ...prev,
              [activeFormId]: !(prev[activeFormId] ?? true),
            }));
          }}
          fieldsLength={fields.length}
        />
      </Stack>
    </FormProvider>
  );
}
