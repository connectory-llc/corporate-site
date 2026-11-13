import QRCode from 'qrcode';

// 読み取りに必要な余白は名刺のレイアウト側で取り、QR コードの大きさをそろえやすくする
const QUIET_ZONE_MODULES = 0;
const MODULE_COLOR = '#0f1b2d';
const TRANSPARENT = '#0000';

// 誤り訂正を上げるとモジュールが細かくなり、名刺の大きさでは読み取りにくくなるため M にとどめる
export function renderQrSvg(url: string) {
  return QRCode.toString(url, {
    type: 'svg',
    margin: QUIET_ZONE_MODULES,
    errorCorrectionLevel: 'M',
    color: { dark: MODULE_COLOR, light: TRANSPARENT },
  });
}
