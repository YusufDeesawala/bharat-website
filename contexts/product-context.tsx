"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
}

interface ProductContextType {
  products: Product[]
  categories: string[]
  addProduct: (product: Product) => void
  removeProduct: (id: string) => void
  updateProduct: (id: string, product: Product) => void
  addCategory: (category: string) => void
  removeCategory: (category: string) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Heavy Duty PVC Pipe Clamp",
    description: "Robust pipe clamp designed for high-pressure applications with superior grip and durability.",
    category: "Pipe Clamps",
    material: "PVC with Steel Reinforcement",
    sizeRange: '1/2" - 8"',
    pressureRating: "300 PSI",
    temperatureRange: "-10°C to 80°C",
    applications: ["Water supply systems", "Industrial piping", "Chemical processing", "HVAC systems"],
    additionalSpecs: ["NSF certified", "UV resistant", "Corrosion resistant", "Easy installation"],
  },
  {
    id: "2",
    name: "Standard PVC Flange",
    description: "High-quality PVC flange for secure pipe connections in various industrial applications.",
    category: "Flanges",
    material: "PVC",
    sizeRange: '2" - 12"',
    pressureRating: "150 PSI",
    temperatureRange: "0°C to 60°C",
    applications: [
      "Water treatment plants",
      "Chemical processing",
      "Food and beverage industry",
      "Pharmaceutical applications",
    ],
    additionalSpecs: ["ANSI standard", "Smooth finish", "Chemical resistant", "Long service life"],
  },
  {
    id: "3",
    name: "Quick Connect Coupling",
    description: "Fast and reliable coupling system for temporary or permanent pipe connections.",
    category: "Couplings",
    material: "PVC with Rubber Seals",
    sizeRange: '1" - 6"',
    pressureRating: "200 PSI",
    temperatureRange: "-5°C to 70°C",
    applications: ["Irrigation systems", "Pool and spa installations", "Temporary piping", "Maintenance applications"],
    additionalSpecs: ["Tool-free installation", "Leak-proof design", "Reusable", "Color-coded sizes"],
  },
  {
    id: "4",
    name: "Ball Valve PVC",
    description: "Reliable ball valve for flow control in PVC piping systems with smooth operation.",
    category: "Valves",
    material: "PVC Body with PTFE Ball",
    sizeRange: '1/2" - 4"',
    pressureRating: "250 PSI",
    temperatureRange: "0°C to 65°C",
    applications: ["Water distribution", "Chemical handling", "Pool systems", "Industrial processes"],
    additionalSpecs: ["Full port design", "Lever handle", "Bubble-tight seal", "Low torque operation"],
  },
  {
    id: "5",
    name: "Threaded Adapter",
    description: "Versatile threaded adapter for connecting different pipe types and sizes.",
    category: "Adapters",
    material: "PVC",
    sizeRange: '1/2" - 3"',
    pressureRating: "200 PSI",
    temperatureRange: "-10°C to 60°C",
    applications: ["Pipe transitions", "Equipment connections", "Repair applications", "System modifications"],
    additionalSpecs: ["NPT threads", "Precision machined", "Multiple configurations", "Easy installation"],
  },
  {
    id: "6",
    name: "Elbow Fitting 90°",
    description: "Smooth 90-degree elbow fitting for directional changes in piping systems.",
    category: "Fittings",
    material: "PVC",
    sizeRange: '1/2" - 10"',
    pressureRating: "200 PSI",
    temperatureRange: "0°C to 60°C",
    applications: ["Plumbing systems", "Drainage applications", "Ventilation systems", "Industrial piping"],
    additionalSpecs: ["Smooth interior", "Socket connections", "Standard dimensions", "High flow capacity"],
  },
]

const defaultCategories = ["Pipe Clamps", "Flanges", "Couplings", "Valves", "Adapters", "Fittings"]

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(defaultCategories)

  useEffect(() => {
    const savedProducts = localStorage.getItem("pvc-products")
    const savedCategories = localStorage.getItem("pvc-categories")

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(defaultProducts)
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      setCategories(defaultCategories)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("pvc-products", JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem("pvc-categories", JSON.stringify(categories))
  }, [categories])

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product])
  }

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? updatedProduct : product)))
  }

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category])
    }
  }

  const removeCategory = (categoryToRemove: string) => {
    // Don't remove a category if products are using it
    const productsUsingCategory = products.filter(product => product.category === categoryToRemove);
    if (productsUsingCategory.length > 0) {
      alert(`Cannot remove category "${categoryToRemove}" because ${productsUsingCategory.length} product(s) are using it. Please reassign or delete these products first.`);
      return false;
    }
    
    setCategories(prev => prev.filter(category => category !== categoryToRemove));
    return true;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        removeProduct,
        updateProduct,
        addCategory,
        removeCategory,
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
