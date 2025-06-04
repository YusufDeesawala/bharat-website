"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export interface Product {
  id: string
  name: string
  description: string
  category: string
  material: string
  sizeRange: string
  pressureRating: string
  temperatureRange: string
  image?: string
  applications?: string[]
  additionalSpecs?: string[]
  created_at?: string
  updated_at?: string
}

interface ProductContextType {
  products: Product[]
  categories: string[]
  loading: boolean
  error: string | null
  addProduct: (product: Omit<Product, "id" | "created_at" | "updated_at">) => Promise<boolean>
  removeProduct: (id: string) => Promise<boolean>
  updateProduct: (id: string, product: Omit<Product, "id" | "created_at" | "updated_at">) => Promise<boolean>
  addCategory: (category: string) => Promise<boolean>
  removeCategory: (category: string) => Promise<boolean>
  refreshData: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...")
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching products:", error)
        setError(`Error fetching products: ${error.message}`)
        return
      }

      console.log("Products fetched:", data)

      const formattedProducts =
        data?.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          material: product.material,
          sizeRange: product.size_range,
          pressureRating: product.pressure_rating,
          temperatureRange: product.temperature_range,
          image: product.image_url,
          applications: product.applications || [],
          additionalSpecs: product.additional_specs || [],
          created_at: product.created_at,
          updated_at: product.updated_at,
        })) || []

      setProducts(formattedProducts)
      setError(null)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError(`Unexpected error: ${error}`)
    }
  }

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories...")
      const { data, error } = await supabase.from("categories").select("name").order("name")

      if (error) {
        console.error("Error fetching categories:", error)
        setError(`Error fetching categories: ${error.message}`)
        return
      }

      console.log("Categories fetched:", data)
      setCategories(data?.map((cat) => cat.name) || [])
      setError(null)
    } catch (error) {
      console.error("Error fetching categories:", error)
      setError(`Unexpected error: ${error}`)
    }
  }

  const refreshData = async () => {
    setLoading(true)
    setError(null)
    await Promise.all([fetchProducts(), fetchCategories()])
    setLoading(false)
  }

  useEffect(() => {
    refreshData()
  }, [])

  const addProduct = async (productData: Omit<Product, "id" | "created_at" | "updated_at">): Promise<boolean> => {
    try {
      console.log("Adding product:", productData)

      const insertData = {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        material: productData.material,
        size_range: productData.sizeRange,
        pressure_rating: productData.pressureRating,
        temperature_range: productData.temperatureRange,
        image_url: productData.image || null,
        applications: productData.applications || [],
        additional_specs: productData.additionalSpecs || [],
      }

      console.log("Insert data:", insertData)

      const { data, error } = await supabase.from("products").insert([insertData]).select()

      if (error) {
        console.error("Error adding product:", error)
        setError(`Error adding product: ${error.message}`)
        return false
      }

      console.log("Product added successfully:", data)
      await fetchProducts()
      return true
    } catch (error) {
      console.error("Error adding product:", error)
      setError(`Unexpected error: ${error}`)
      return false
    }
  }

  const removeProduct = async (id: string): Promise<boolean> => {
    try {
      console.log("Removing product:", id)

      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) {
        console.error("Error removing product:", error)
        setError(`Error removing product: ${error.message}`)
        return false
      }

      console.log("Product removed successfully")
      await fetchProducts()
      return true
    } catch (error) {
      console.error("Error removing product:", error)
      setError(`Unexpected error: ${error}`)
      return false
    }
  }

  const updateProduct = async (
    id: string,
    productData: Omit<Product, "id" | "created_at" | "updated_at">,
  ): Promise<boolean> => {
    try {
      console.log("Updating product:", id, productData)

      const updateData = {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        material: productData.material,
        size_range: productData.sizeRange,
        pressure_rating: productData.pressureRating,
        temperature_range: productData.temperatureRange,
        image_url: productData.image || null,
        applications: productData.applications || [],
        additional_specs: productData.additionalSpecs || [],
      }

      console.log("Update data:", updateData)

      const { data, error } = await supabase.from("products").update(updateData).eq("id", id).select()

      if (error) {
        console.error("Error updating product:", error)
        setError(`Error updating product: ${error.message}`)
        return false
      }

      console.log("Product updated successfully:", data)
      await fetchProducts()
      return true
    } catch (error) {
      console.error("Error updating product:", error)
      setError(`Unexpected error: ${error}`)
      return false
    }
  }

  const addCategory = async (categoryName: string): Promise<boolean> => {
    try {
      console.log("Adding category:", categoryName)

      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: categoryName }])
        .select()

      if (error) {
        console.error("Error adding category:", error)
        setError(`Error adding category: ${error.message}`)
        return false
      }

      console.log("Category added successfully:", data)
      await fetchCategories()
      return true
    } catch (error) {
      console.error("Error adding category:", error)
      setError(`Unexpected error: ${error}`)
      return false
    }
  }

  const removeCategory = async (categoryName: string): Promise<boolean> => {
    try {
      console.log("Removing category:", categoryName)

      // Check if any products are using this category
      const productsUsingCategory = products.filter((product) => product.category === categoryName)
      if (productsUsingCategory.length > 0) {
        setError(
          `Cannot remove category "${categoryName}" because ${productsUsingCategory.length} product(s) are using it.`,
        )
        return false
      }

      const { error } = await supabase.from("categories").delete().eq("name", categoryName)

      if (error) {
        console.error("Error removing category:", error)
        setError(`Error removing category: ${error.message}`)
        return false
      }

      console.log("Category removed successfully")
      await fetchCategories()
      return true
    } catch (error) {
      console.error("Error removing category:", error)
      setError(`Unexpected error: ${error}`)
      return false
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        addProduct,
        removeProduct,
        updateProduct,
        addCategory,
        removeCategory,
        refreshData,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
