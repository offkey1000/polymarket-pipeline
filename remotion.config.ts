import { Config } from "@remotion/cli/config";

// PNG frames + bt709 keep the output as standard limited-range yuv420p H.264.
// (JPEG frames tag the stream as full-range yuvj420p, which some players —
// QuickTime, parts of mobile/web — refuse to open.)
Config.setVideoImageFormat("png");
Config.setColorSpace("bt709");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);

// Use the system-provided headless Chromium (Playwright build) so renders work
// in this environment without downloading Chrome Headless Shell over the network.
const HEADLESS_SHELL =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
Config.setBrowserExecutable(HEADLESS_SHELL);
