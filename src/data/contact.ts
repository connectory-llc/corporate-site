// 問い合わせ先が決まったら、どちらかに値を入れるとお問い合わせセクションに導線が出る
export interface ContactChannels {
  email?: string;
  formUrl?: string;
}

export const CONTACT: ContactChannels = {};
