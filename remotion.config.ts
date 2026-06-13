import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);

// Use the system-provided headless Chromium (Playwright build) so renders work
// in this environment without downloading Chrome Headless Shell over the network.
const HEADLESS_SHELL =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
Config.setBrowserExecutable(HEADLESS_SHELL);
