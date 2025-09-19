import { motion } from 'framer-motion'
import { Github, BookOpen, Code, Users, Heart, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'

const DocsPage = () => {
  const sections = [
    {
      title: "Getting Started",
      description: "Learn how to use Omari to generate setup scripts for your system",
      items: [
        "Select your Linux distribution or Windows",
        "Choose your desktop environment",
        "Browse and select applications by category",
        "Generate and download your custom script"
      ]
    },
    {
      title: "Contributing",
      description: "Help improve Omari by contributing to the open source project",
      items: [
        "Fork the repository on GitHub",
        "Create a new branch for your feature",
        "Add new applications or improve existing ones",
        "Submit a pull request with your changes"
      ]
    },
    {
      title: "Adding Applications",
      description: "Learn how to add new applications to the Omari script collection",
      items: [
        "Create installation scripts in the appropriate category",
        "Add compatibility information for different distributions",
        "Test scripts on target systems",
        "Update the apps.json configuration file"
      ]
    },
    {
      title: "Script Development",
      description: "Guidelines for creating reliable installation scripts",
      items: [
        "Use proper error handling and exit codes",
        "Check for existing installations",
        "Provide clear user feedback",
        "Follow security best practices"
      ]
    }
  ]

  const quickLinks = [
    {
      title: "GitHub Repository",
      description: "View source code and contribute",
      href: "https://github.com/ashupal86/omari",
      icon: <Github className="h-5 w-5" />
    },
    {
      title: "Scripts Directory",
      description: "Browse available installation scripts",
      href: "https://github.com/ashupal86/omari/tree/main/scripts",
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "Issues & Discussions",
      description: "Report bugs or suggest features",
      href: "https://github.com/ashupal86/omari/issues",
      icon: <Users className="h-5 w-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Omari Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about using and contributing to Omari, the open source post-install setup tool.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Documentation Sections */}
            <div className="lg:col-span-2 space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                      <CardDescription className="text-base">
                        {section.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {quickLinks.map((link, index) => (
                      <a
                        key={link.title}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                          {link.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {link.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Open Source</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-muted-foreground">
                        Made with love by the community
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        MIT License
                      </span>
                    </div>
                    <Button asChild className="w-full">
                      <a
                        href="https://github.com/ashupal86/omari"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Star on GitHub
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Generate your first setup script or contribute to the project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/generate">Generate Script</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/ashupal86/omari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  Contribute
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default DocsPage
