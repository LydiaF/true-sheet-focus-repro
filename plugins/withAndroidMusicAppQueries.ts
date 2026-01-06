import { ConfigPlugin, withAndroidManifest } from '@expo/config-plugins'

const MUSIC_APP_SCHEMES = [
  'spotify',
  'youtubemusic',
  'vnd.youtube.music',
  'music',
  'applemusic',
]

const VIEW_ACTION = 'android.intent.action.VIEW'

const withAndroidMusicAppQueries: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults
    const androidManifest = manifest.manifest

    if (!androidManifest.queries) {
      androidManifest.queries = []
    }

    MUSIC_APP_SCHEMES.forEach((scheme) => {
      const hasQuery = androidManifest.queries?.some((query) => {
        const intents = query.intent || []
        return intents.some((intent) => {
          const hasViewAction = intent.action?.some(
            (action) => action.$['android:name'] === VIEW_ACTION
          )
          const hasScheme = intent.data?.some(
            (data) => data.$['android:scheme'] === scheme
          )
          return hasViewAction && hasScheme
        })
      })

      if (!hasQuery) {
        androidManifest.queries.push({
          intent: [
            {
              action: [{ $: { 'android:name': VIEW_ACTION } }],
              data: [{ $: { 'android:scheme': scheme } }],
            },
          ],
        })
      }
    })

    return config
  })
}

export default withAndroidMusicAppQueries
