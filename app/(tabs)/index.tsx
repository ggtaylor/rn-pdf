import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WebView from "react-native-webview";
import Constants from "expo-constants";
import { useAssets } from "expo-asset";

export default function HomeScreen() {
  const htmlRaw = require("../../assets/pdf/test.html");
  const [html, error] = useAssets(htmlRaw);

  const webViewProps: any = {
    javaScriptEnabled: true,
    // androidLayerType: "hardware",
    originWhitelist: ["*"],
    domStorageEnabled: true,
    // mixedContentMode: "always",
    allowFileAccess: true,
    allowFileAccessFromFileURLs: true,
    allowUniversalAccessFromFileURLs: true,
    mixedContentMode: "always",
    style: styles.webViewContainer,
    onLoad: () => {},
    source: {
      // html: '<!DOCTYPE html><html lang="en"><head><script>alert("aaaa");</script></head><body><div id="abc">pdf</div><canvas id="the-canvas" style="border: 1px solid red; width: 100%"></canvas></body></html>',
      // html: '<!DOCTYPE html><html lang="en"><head></head><body><div id="abc">pdf</div><canvas id="the-canvas" style="border: 1px solid red; width: 100%"></canvas></body></html>',
      uri: html?.[0].localUri,
    },
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">PDF Online</ThemedText>
      </ThemedView>
      <ThemedText>Load scripts and PDF from the internet</ThemedText>

      <WebView {...webViewProps} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  webViewContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    width: "100%",
    height: 800,
    borderColor: "red",
    borderWidth: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
