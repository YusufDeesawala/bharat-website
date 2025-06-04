"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Truck, Award, Users, Wrench, Factory } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BrandsCarousel } from "@/components/brands-carousel"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 },
}

const cardHover = {
  y: -8,
  scale: 1.02,
  transition: { type: "spring", stiffness: 300, damping: 20 },
}

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={countRef}>{count}</span>
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950">
          {/* Floating Geometric Shapes with Better Animation */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-200/40 to-blue-200/40 dark:from-green-400/30 dark:to-emerald-400/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 dark:from-emerald-400/30 dark:to-green-400/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [-20, 30, -20],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-200/50 to-teal-200/50 dark:from-green-300/40 dark:to-emerald-300/40 rounded-lg blur-lg"
          />
          <motion.div
            animate={{
              x: [-30, 40, -30],
              scale: [1, 1.6, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 22,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-teal-300/30 to-blue-300/30 dark:from-emerald-300/25 dark:to-green-300/25 rounded-full blur-2xl"
          />

          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 pattern-light dark:pattern-dark opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="space-y-6">
                <motion.div variants={scaleIn}>
                  <Badge
                    variant="secondary"
                    className="bg-teal-100 text-teal-800 dark:bg-green-900 dark:text-green-100 px-6 py-3 text-base font-semibold rounded-full"
                  >
                    ✨ Industry Leading Solutions
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
                  variants={fadeInUp}
                >
                  Premium PVC
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-green-400 dark:to-emerald-400 block"
                    variants={fadeInUp}
                  >
                    Pipe Solutions
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  variants={fadeInUp}
                >
                  Professional supplier of high-quality PVC pipe clamps, flanges, and fittings for industrial and
                  commercial applications worldwide.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-6" variants={fadeInUp}>
                <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    <Link href="/catalogue">
                      View Catalogue <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold border-2 border-teal-200 dark:border-green-700 hover:bg-teal-50 dark:hover:bg-green-950 rounded-full backdrop-blur-sm"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-3 gap-8 pt-8" variants={staggerContainer}>
                {[
                  { end: 500, label: "Products", suffix: "+" },
                  { end: 15, label: "Years Experience", suffix: "+" },
                  { end: 1000, label: "Happy Clients", suffix: "+" },
                ].map((stat, index) => (
                  <motion.div key={index} variants={scaleIn} className="text-center">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-green-400 dark:to-emerald-400">
                      <AnimatedCounter end={stat.end} />
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight} className="relative">
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="PVC Pipe Clamps and Flanges"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 dark:from-green-400/20 dark:to-emerald-400/20 rounded-3xl transform rotate-6 -z-10"
                animate={{
                  rotate: [6, 8, 6],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brands Carousel */}
      <BrandsCarousel />

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose PVC Pro Solutions?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We deliver exceptional quality and service that sets us apart in the industry
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                description: "All products meet international standards with rigorous quality control",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Quick and reliable shipping to get your projects moving",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: Award,
                title: "Industry Certified",
                description: "ISO certified with proven track record in the industry",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Dedicated technical support team to assist with your needs",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Wrench,
                title: "Custom Solutions",
                description: "Tailored products and solutions for specific requirements",
                color: "from-indigo-500 to-blue-500",
              },
              {
                icon: Factory,
                title: "Manufacturing Excellence",
                description: "State-of-the-art manufacturing facilities and processes",
                color: "from-emerald-500 to-green-500",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div whileHover={cardHover} className="h-full">
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600 dark:from-green-800 dark:via-emerald-800 dark:to-teal-800 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Ready to Get Started?</h2>
            <p className="text-xl lg:text-2xl text-teal-100 dark:text-green-100 mb-12 leading-relaxed">
              Explore our comprehensive catalogue or get in touch with our experts for personalized solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="px-10 py-4 text-lg font-semibold rounded-full shadow-xl"
                >
                  <Link href="/catalogue">Browse Catalogue</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-teal-600 dark:hover:text-green-800 px-10 py-4 text-lg font-semibold rounded-full backdrop-blur-sm"
                >
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
