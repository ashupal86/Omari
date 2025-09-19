import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Star, Users, Code, Zap, Shield, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'

const LandingPage = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Choose Your Distro",
      description: "Select from popular Linux distributions and desktop environments with a simple interface."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Select Apps by Category",
      description: "Browse through categorized applications and select what you need for your setup."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Download One Script",
      description: "Generate a single bash script that installs all your selected applications automatically."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fully Open Source",
      description: "Transparent, community-driven project with all scripts available on GitHub."
    }
  ]

  const distributions = [
    { name: 'Ubuntu', color: 'from-orange-500 to-red-500' },
    { name: 'Debian', color: 'from-red-500 to-pink-500' },
    { name: 'Fedora', color: 'from-blue-500 to-cyan-500' },
    { name: 'Arch Linux', color: 'from-cyan-500 to-blue-500' },
    { name: 'openSUSE', color: 'from-green-500 to-emerald-500' },
    { name: 'Windows', color: 'from-blue-600 to-indigo-600' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge variant="secondary" className="mb-4">
                <Github className="h-3 w-3 mr-1" />
                Open Source Project
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Omari
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mt-4 max-w-4xl mx-auto">
                The Open Source Post-Install Setup Tool for Linux & Windows
              </p>
              <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
                Select your distro, desktop environment, and apps. Generate one script to set up your system in minutes, not hours.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/generate">
                  Generate Setup Script
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                <a
                  href="https://github.com/ashupal86/omari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </motion.div>

            {/* GitHub Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>2.1k stars</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>150+ contributors</span>
              </div>
              <div className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>MIT License</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Omari?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built by developers, for developers. Get your system ready with the tools you actually need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Distributions */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supported Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Works with the most popular Linux distributions and Windows
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {distributions.map((distro, index) => (
              <motion.div
                key={distro.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${distro.color} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                      {distro.name.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-lg">{distro.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Open Source Community
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Omari is built by developers, for developers. Contribute, suggest features, or just use it to speed up your setup process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a
                  href="https://github.com/ashupal86/omari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  Contribute on GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/docs">
                  Read Documentation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
