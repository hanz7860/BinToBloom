#!/usr/bin/env node

// This script demonstrates how to use gltfjsx to convert GLTF models to React components
// Run: npx gltfjsx public/models/avatar1.glb --transform

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const modelsDir = "public/models"
const outputDir = "components/generated-avatars"

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// List of avatar models to process
const avatarModels = ["avatar1.glb", "avatar2.glb", "avatar3.glb", "avatar4.glb", "avatar5.glb"]

console.log("🚀 Generating React components from GLTF models...")

avatarModels.forEach((model, index) => {
  const modelPath = path.join(modelsDir, model)
  const componentName = `Avatar${index + 1}`

  if (fs.existsSync(modelPath)) {
    try {
      console.log(`📦 Processing ${model}...`)

      // Run gltfjsx command
      const command = `npx gltfjsx ${modelPath} --transform --types --output ${outputDir}/${componentName}.tsx`
      execSync(command, { stdio: "inherit" })

      console.log(`✅ Generated ${componentName}.tsx`)
    } catch (error) {
      console.error(`❌ Error processing ${model}:`, error.message)
    }
  } else {
    console.warn(`⚠️  Model not found: ${modelPath}`)
  }
})

console.log("🎉 Avatar component generation complete!")
console.log("\n📝 Next steps:")
console.log("1. Place your Ready Player Me .glb files in public/models/")
console.log("2. Run this script to generate React components")
console.log("3. Import and use the generated components in your app")
