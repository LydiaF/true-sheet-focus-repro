import 'tsx/cjs'
import { ConfigContext, ExpoConfig } from 'expo/config'
import packageJson from './package.json'
import { readFileSync } from 'fs'
import { join } from 'path'

const DARK_BACKGROUND = '#16161e'
// can't be elsewhere or else hangs
const getEasEnvVar = (key: string): string => {
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

const slug = 'app-name'
const rootName = 'appname'
const { version } = packageJson

export default ({ config }: ConfigContext): ExpoConfig => {
  // Evaluate these lazily inside the function to avoid hanging during module evaluation
  const profile = getEasEnvVar('EAS_BUILD_PROFILE')
  const isDev = profile === 'development'

  const packageName = isDev
    ? `com.example.${rootName}.dev`
    : `com.example.${rootName}`

  console.log('[expo-config] profile:', { profile, isDev, packageName })

  return {
    ...config,
    name: isDev ? 'App Name Dev' : 'App Name', // make sure .env.expo is 'development', for example
    slug,
    version,
    scheme: isDev ? `${slug}-dev` : slug,
    backgroundColor: DARK_BACKGROUND,
    androidNavigationBar: {
      ...config.androidNavigationBar,
      backgroundColor: DARK_BACKGROUND,
    },
    splash: {
      ...config.splash,
    },
    plugins: [
      [
        'react-native-edge-to-edge',
        {
          android: {
            parentTheme: 'Default',
            enforceNavigationBarContrast: false,
          },
        },
      ],
      'expo-web-browser',
      'expo-router',
      'expo-secure-store',
    ],
    ios: {
      bundleIdentifier: packageName,
      entitlements: {
        'com.apple.developer.networking.wifi-info': true,
      },
      supportsTablet: true,
    },
    android: {
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: isDev
          ? './assets/adaptive-foreground-dev.png'
          : './assets/adaptive-foreground.png',
        backgroundColor: '#190dc0',
      },
      package: packageName,
    },
  }
}
