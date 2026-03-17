"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Product, NutrientValues } from "@/features/products/types/product"
import { AdminInput, AdminSelect, AdminTextarea } from "@/features/admin/components/ui/AdminInput"
import { AdminButton } from "@/features/admin/components/ui/AdminButton"
import { AdminToggle } from "@/features/admin/components/ui/AdminToggle"
import { AdminHighlightsInput } from "@/features/admin/components/ui/AdminHighlightsInput"
import { productSchema, ProductFormValues } from "@/features/admin/schemas/adminSchemas"
import styles from "./ProductForm.module.css"

export interface ProductFormProps {
  initialData?: Product | null
  onSubmit: (data: Partial<Product>) => Promise<void>
  onCancel: () => void
}

const NUTRIENT_KEYS = [
  { key: "valor_energetico_kcal", label: "Valor energético" },
  { key: "carboidratos_g", label: "Carboidratos" },
  { key: "acucares_totais_g", label: "Açúcares totais" },
  { key: "acucares_adicionados_g", label: "Açúcares adicionados" },
  { key: "proteinas_g", label: "Proteínas" },
  { key: "gorduras_totais_g", label: "Gorduras totais" },
  { key: "gorduras_saturadas_g", label: "Gorduras saturadas" },
  { key: "gorduras_trans_g", label: "Gorduras trans" },
  { key: "gorduras_monoinsaturadas_g", label: "Gorduras monoinsaturadas" },
  { key: "gorduras_poliinsaturadas_g", label: "Gorduras poliinsaturadas" },
  { key: "colesterol_mg", label: "Colesterol" },
  { key: "fibras_g", label: "Fibras" },
  { key: "sodio_mg", label: "Sódio" },
]

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [nutrients, setNutrients] = useState<Record<string, NutrientValues>>(() => {
    const defaults = NUTRIENT_KEYS.reduce(
      (acc, item) => ({
        ...acc,
        [item.key]: { per100g: "-", perServing: "-", vd: "-" },
      }),
      {}
    );
    
    if (initialData?.nutritionalInfo?.nutrients) {
      return { ...defaults, ...initialData.nutritionalInfo.nutrients };
    }
    
    return defaults;
  });

  const handleNutrientChange = (key: string, field: keyof NutrientValues, value: string | number) => {
    setNutrients((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }))
  }

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      highlights: initialData?.highlights || "",
      category: initialData?.category || "linha-integral",
      image: initialData?.image || "",
      ingredients: initialData?.ingredients || "",
      allergens: initialData?.allergens || "",
      mayContain: initialData?.mayContain || "",
      containsGluten: initialData?.containsGluten !== undefined ? initialData.containsGluten : true,
      nutritionalInfo: {
        servingSize: initialData?.nutritionalInfo?.servingSize || 50,
        servingsPerPack: initialData?.nutritionalInfo?.servingsPerPack || 7,
      },
    },
  })

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setValue("image", result) // For now, we store as base64 in the DB
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImagePreview(null)
    setValue("image", "")
  }

  const onFormSubmit = useCallback(
    async (data: ProductFormValues) => {
      setLoading(true)
      try {
        await onSubmit({
          ...data,
          nutritionalInfo: {
            ...data.nutritionalInfo,
            nutrients: nutrients as any,
          },
        })
      } finally {
        setLoading(false)
      }
    },
    [onSubmit, nutrients]
  )

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? "Editar Produto" : "Novo Produto"}</h2>
      </div>

      <div className={styles.grid}>
        <AdminInput label="Nome do Produto" {...register("name")} error={errors.name?.message} required />

        <AdminInput label="Slug (URL)" {...register("slug")} error={errors.slug?.message} required />

        <AdminSelect
          label="Categoria"
          value={watch("category")}
          onChange={(val) => setValue("category", val)}
          options={[
            { label: "Pães Tradicionais", value: "paes-tradicionais" },
            { label: "Linha Integral", value: "linha-integral" },
            { label: "Sem Casca", value: "sem-casca" },
          ]}
          required
        />

        <div className={styles.imageUploadArea} onClick={() => document.getElementById("image-upload")?.click()}>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          
          {imagePreview ? (
            <div className={styles.previewContainer}>
              <img src={imagePreview} alt="Preview" className={styles.previewImg} />
              <button type="button" className={styles.removeBtn} onClick={removeImage}>×</button>
            </div>
          ) : (
            <>
              <div className={styles.uploadIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <div className={styles.uploadText}>
                <h4>Clique para importar imagem</h4>
                <p>Formatos suportados: PNG, JPG ou WEBP</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.fullWidth}>
          <AdminTextarea label="Ingredientes" {...register("ingredients")} placeholder="Ex: Farinha de trigo integral, água..." rows={2} />
        </div>

        <AdminInput label="Alérgicos" {...register("allergens")} placeholder="Ex: CONTÉM TRIGO E DERIVADOS DE SOJA" />
        
        <AdminInput label="Pode Conter" {...register("mayContain")} placeholder="Ex: PODE CONTER OVO, LEITE, AVEIA..." />

        <div className={styles.toggleField}>
          <AdminToggle 
            label="Contém Glúten?" 
            checked={watch("containsGluten")} 
            onChange={(val) => setValue("containsGluten", val)} 
          />
        </div>

        <div className={styles.fullWidth}>
          <AdminHighlightsInput
            label="Destaques (Benefícios)"
            value={watch("highlights") || ""}
            onChange={(val) => setValue("highlights", val)}
            placeholder="Ex: ZERO GORDURAS SATURADAS"
          />
        </div>

        <div className={styles.fullWidth}>
          <AdminTextarea label="Descrição" {...register("description")} error={errors.description?.message} required rows={3} />
        </div>

        <div className={styles.sectionHeader}>
          <h3>Base Nutricional</h3>
        </div>

        <AdminInput
          label="Tamanho da Porção (g)"
          type="number"
          {...register("nutritionalInfo.servingSize")}
          error={errors.nutritionalInfo?.servingSize?.message}
          required
        />

        <AdminInput
          label="Porções por Embalagem"
          type="number"
          {...register("nutritionalInfo.servingsPerPack")}
          error={errors.nutritionalInfo?.servingsPerPack?.message}
          required
        />

        <div className={styles.sectionHeader}>
          <h3>Tabela de Nutrientes</h3>
        </div>

        <div className={styles.nutrientGrid}>
          {NUTRIENT_KEYS.map(({ key, label }) => {
            const val = nutrients[key] || { per100g: "-", perServing: "-", vd: "-" }
            return (
              <div key={key} className={styles.nutrientField}>
                <span className={styles.nutrientLabel}>{label}</span>
                <div className={styles.nutrientInputs}>
                  <div>
                    <span className={styles.subLabel}>100g</span>
                    <input
                      className={styles.input}
                      value={val.per100g as string}
                      onChange={(e) => handleNutrientChange(key, "per100g", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className={styles.subLabel}>Porção</span>
                    <input
                      className={styles.input}
                      value={val.perServing as string}
                      onChange={(e) => handleNutrientChange(key, "perServing", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className={styles.subLabel}>%VD</span>
                    <input
                      className={styles.input}
                      value={val.vd as string}
                      onChange={(e) => handleNutrientChange(key, "vd", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <AdminButton type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </AdminButton>
        <AdminButton type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Produto"}
        </AdminButton>
      </div>
    </form>
  )
}
