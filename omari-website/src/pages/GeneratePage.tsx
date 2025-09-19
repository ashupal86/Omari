import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Copy, Download, AlertTriangle, Terminal, Monitor, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import appsData from '../mock/apps.json'
import Navigation from '@/components/Navigation'

interface App {
  id: string
  name: string
  description: string
  compatibility: string[]
  scriptPath: string
}

interface Category {
  id: string
  name: string
  description: string
  apps: App[]
}

interface Distro {
  id: string
  name: string
  description: string
}

interface DesktopEnvironment {
  id: string
  name: string
  description: string
}

const GeneratePage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDistro, setSelectedDistro] = useState<string>('')
  const [selectedDesktop, setSelectedDesktop] = useState<string>('')
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [generatedScript, setGeneratedScript] = useState<string>('')

  const distros: Distro[] = appsData.distros
  const desktopEnvironments: DesktopEnvironment[] = appsData.desktopEnvironments
  const categories: Category[] = appsData.categories

  const steps = [
    { id: 1, title: 'Select System', description: 'Choose your distro and desktop environment' },
    { id: 2, title: 'Choose Apps', description: 'Select applications by category' },
    { id: 3, title: 'Generate Script', description: 'Download your custom setup script' }
  ]

  // Auto advance to step 2 when both distro and desktop are selected
  useEffect(() => {
    if (selectedDistro && selectedDesktop && currentStep === 1) {
      setCurrentStep(2)
    }
  }, [selectedDistro, selectedDesktop, currentStep])

  const toggleApp = (appId: string) => {
    const newSelectedApps = new Set(selectedApps)
    if (newSelectedApps.has(appId)) {
      newSelectedApps.delete(appId)
    } else {
      newSelectedApps.add(appId)
    }
    setSelectedApps(newSelectedApps)
  }

  const toggleCategory = (categoryId: string) => {
    const newExpandedCategories = new Set<string>()
    if (!expandedCategories.has(categoryId)) {
      newExpandedCategories.add(categoryId)
    }
    setExpandedCategories(newExpandedCategories)
  }

  const getCompatibleApps = (category: Category) => {
    return category.apps.filter(app => app.compatibility.includes(selectedDistro))
  }

  const generateScript = () => {
    const selectedAppsList = Array.from(selectedApps)
    const scriptLines = [
      '#!/usr/bin/env bash',
      'set -e',
      'REPO_BASE="https://raw.githubusercontent.com/ashupal86/omari/main/scripts"',
      '',
      'echo "Installing selected applications..."',
      ''
    ]

    // Group apps by category for better organization
    const appsByCategory = new Map<string, App[]>()
    selectedAppsList.forEach(appId => {
      categories.forEach(category => {
        const app = category.apps.find(a => a.id === appId)
        if (app) {
          if (!appsByCategory.has(category.name)) {
            appsByCategory.set(category.name, [])
          }
          appsByCategory.get(category.name)!.push(app)
        }
      })
    })

    appsByCategory.forEach((apps, categoryName) => {
      scriptLines.push(`echo "Installing ${categoryName} applications..."`)
      apps.forEach(app => {
        scriptLines.push(`curl -fsSL "$REPO_BASE/${app.scriptPath}" -o /tmp/${app.id}.sh`)
        scriptLines.push(`chmod +x /tmp/${app.id}.sh`)
        scriptLines.push(`sudo /tmp/${app.id}.sh`)
        scriptLines.push('')
      })
    })

    scriptLines.push('echo "Installation complete!"')
    setGeneratedScript(scriptLines.join('\n'))
    setCurrentStep(3)
  }

  const copyScript = () => {
    navigator.clipboard.writeText(generatedScript)
    // You could add a toast notification here
  }

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'omari-install.sh'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-muted-foreground">
            {steps.map((step) => (
              <div key={step.id} className="text-center max-w-32">
                <div className="font-medium">{step.title}</div>
                <div className="text-xs mt-1">{step.description}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 1: Select Distro and Desktop Environment */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Monitor className="h-6 w-6 mr-2" />
                    Select Your System
                  </CardTitle>
                  <CardDescription>
                    Choose your Linux distribution and desktop environment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium">
                        Linux Distribution
                      </label>
                      <select
                        value={selectedDistro}
                        onChange={(e) => setSelectedDistro(e.target.value)}
                        className="w-full p-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-ring"
                      >
                        <option value="">Select a distribution</option>
                        {distros.map((distro) => (
                          <option key={distro.id} value={distro.id}>
                            {distro.name}
                          </option>
                        ))}
                      </select>
                      {selectedDistro && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-muted-foreground"
                        >
                          {distros.find(d => d.id === selectedDistro)?.description}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium">
                        Desktop Environment
                      </label>
                      <select
                        value={selectedDesktop}
                        onChange={(e) => setSelectedDesktop(e.target.value)}
                        className="w-full p-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-ring"
                      >
                        <option value="">Select a desktop environment</option>
                        {desktopEnvironments.map((de) => (
                          <option key={de.id} value={de.id}>
                            {de.name}
                          </option>
                        ))}
                      </select>
                      {selectedDesktop && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-muted-foreground"
                        >
                          {desktopEnvironments.find(d => d.id === selectedDesktop)?.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Select Apps */}
        <AnimatePresence mode="wait">
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl flex items-center">
                        <Code2 className="h-6 w-6 mr-2" />
                        Choose Your Applications
                      </CardTitle>
                      <CardDescription>
                        Select applications by category for your setup
                      </CardDescription>
                    </div>
                    <Button onClick={() => setCurrentStep(3)}>
                      Continue to Generate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const compatibleApps = getCompatibleApps(category)
                      if (compatibleApps.length === 0) return null

                      return (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-border rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full p-4 text-left flex justify-between items-center hover:bg-accent transition-colors"
                          >
                            <div>
                              <h3 className="text-lg font-semibold">
                                {category.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {category.description}
                              </p>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedCategories.has(category.id) ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedCategories.has(category.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-border bg-muted/50"
                              >
                                <div className="p-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {compatibleApps.map((app) => (
                                      <motion.label
                                        key={app.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="flex items-center p-3 bg-background rounded-lg hover:bg-accent cursor-pointer border border-border"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedApps.has(app.id)}
                                          onChange={() => toggleApp(app.id)}
                                          className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
                                        />
                                        <div className="ml-3 flex-1">
                                          <div className="text-sm font-medium">
                                            {app.name}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            {app.description}
                                          </div>
                                        </div>
                                        {selectedApps.has(app.id) && (
                                          <Check className="h-4 w-4 text-primary" />
                                        )}
                                      </motion.label>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-primary/10 rounded-lg"
                  >
                    <p className="text-sm text-primary">
                      <strong>Selected {selectedApps.size} applications</strong> for {distros.find(d => d.id === selectedDistro)?.name} with {desktopEnvironments.find(d => d.id === selectedDesktop)?.name}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Generate Script */}
        <AnimatePresence mode="wait">
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Terminal className="h-6 w-6 mr-2" />
                    Your Setup Script
                  </CardTitle>
                  <CardDescription>
                    Review and download your custom installation script
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
                  >
                    <div className="flex">
                      <AlertTriangle className="w-5 h-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-destructive">Important Security Notice</h3>
                        <p className="text-sm text-destructive/80 mt-1">
                          Always review scripts before running them. This script will download and execute code from the internet.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">
                        Generated Script
                      </label>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyScript}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadScript}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono border">
                        {generatedScript || 'Click "Generate Script" to create your installation script...'}
                      </pre>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Usage Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>
                          Save the script to a file (e.g., <code className="bg-muted px-1 rounded text-xs">omari-install.sh</code>)
                        </li>
                        <li>
                          Make it executable: <code className="bg-muted px-1 rounded text-xs">chmod +x omari-install.sh</code>
                        </li>
                        <li>
                          Run the script: <code className="bg-muted px-1 rounded text-xs">./omari-install.sh</code>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      ← Back to Apps
                    </Button>
                    <Button onClick={generateScript}>
                      Regenerate Script
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GeneratePage
