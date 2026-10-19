// 未確定の項目は value を空にしておくと表示されない。架空の情報で埋めないこと
export interface CompanyProfileItem {
  label: string;
  value?: string;
}

export const COMPANY_PROFILE: CompanyProfileItem[] = [
  // 正式な表記は登記内容を確認してから確定する
  { label: '会社名', value: '合同会社CONNECTORY' },
  { label: '英文社名', value: 'CONNECTORY LLC' },
  { label: '設立' },
  { label: '所在地' },
  { label: '代表社員' },
  { label: '事業内容', value: 'Web サービス・アプリケーションの企画、開発、運営' },
];
