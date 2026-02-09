interface PopoverType {
  visible: boolean;
  x: number;
  y: number;
  districtName: string;
  districtInfo?: {
    total_gaupalikas: number;
    gaupalikas_covered: number;
    total_camps_setup: number;
    start_date: Date | undefined;
    end_date: Date | undefined;
    days_covered: number;
  };
}
export { type PopoverType };
