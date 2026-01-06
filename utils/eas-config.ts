import { readFileSync } from 'fs'
import { join } from 'path'

export const getEasEnvVar = (key: string): string => {
  // First try environment variable (set during EAS builds or via script)
  if (process.env[key]) {
    return process.env[key]
  }

  // Fallback: read from eas.json
  try {
    const easJsonPath = join(__dirname, '..', 'eas.json')
    const easJson = JSON.parse(readFileSync(easJsonPath, 'utf-8'))

    // Determine which build profile to use
    // Check EAS_BUILD_PROFILE env var first, then default to 'production'
    const profile = process.env.EAS_BUILD_PROFILE || 'production'

    // Look in build[profile].env[key]
    if (easJson.build?.[profile]?.env?.[key]) {
      return easJson.build[profile].env[key]
    }
  } catch (error) {
    // If we can't read eas.json, continue to throw the original error
    console.warn(`[getEasEnvVar] Could not read eas.json:`, error)
  }

  throw new Error(
    `[getEasEnvVar] ${key} not found. Set it as an environment variable or in eas.json`
  )
}
