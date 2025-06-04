"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Truck, Award, Users, Wrench, Factory } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 },
}

const cardHover = {
  y: -10,
  scale: 1.02,
  transition: { type: "spring", stiffness: 300, damping: 20 },
}

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })

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
      {/* Hero Section with Unique Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950">
          {/* Floating Geometric Shapes */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-green-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-40 right-20 w-48 h-48 bg-blue-200/30 dark:bg-emerald-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-200/40 dark:bg-green-300/30 rounded-lg blur-lg"
          />
          <motion.div
            animate={{
              x: [-30, 30, -30],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 right-1/3 w-40 h-40 bg-teal-300/20 dark:bg-emerald-300/20 rounded-full blur-2xl"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 pattern-light dark:pattern-dark" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-teal-100 text-teal-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 text-sm font-medium"
                  >
                    Industry Leading Solutions
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Premium PVC
                  <motion.span
                    className="text-teal-600 dark:text-green-400 block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Pipe Solutions
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Professional supplier of high-quality PVC pipe clamps, flanges, and fittings for industrial and
                  commercial applications worldwide.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 dark:bg-green-600 dark:hover:bg-green-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
                    className="px-8 py-4 text-lg font-semibold border-2 hover:bg-teal-50 dark:hover:bg-green-950"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-8 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 dark:text-green-400">
                    <AnimatedCounter end={500} />+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 dark:text-green-400">
                    <AnimatedCounter end={15} />+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 dark:text-green-400">
                    <AnimatedCounter end={1000} />+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Happy Clients</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="PVC Pipe Clamps and Flanges"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 dark:from-green-400/20 dark:to-emerald-400/20 rounded-2xl transform rotate-6"
                animate={{
                  rotate: [6, 8, 6],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
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
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                description: "All products meet international standards with rigorous quality control",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Quick and reliable shipping to get your projects moving",
              },
              {
                icon: Award,
                title: "Industry Certified",
                description: "ISO certified with proven track record in the industry",
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Dedicated technical support team to assist with your needs",
              },
              {
                icon: Wrench,
                title: "Custom Solutions",
                description: "Tailored products and solutions for specific requirements",
              },
              {
                icon: Factory,
                title: "Manufacturing Excellence",
                description: "State-of-the-art manufacturing facilities and processes",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div whileHover={cardHover}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
                    <CardHeader className="text-center">
                      <motion.div
                        className="mx-auto w-16 h-16 bg-teal-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 dark:group-hover:bg-green-800 transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="h-8 w-8 text-teal-600 dark:text-green-400" />
                      </motion.div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-green-800 to-emerald-800 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black/10"
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
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-teal-100 dark:text-green-100 mb-8">
              Explore our comprehensive catalogue or get in touch with our experts for personalized solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
                  <Link href="/catalogue">Browse Catalogue</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-teal-600 dark:hover:text-green-800 px-8 py-4 text-lg font-semibold"
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
