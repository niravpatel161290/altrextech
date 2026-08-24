// lib/transformer.ts - Modified to accept periodStart filter
import { MeterWithReading } from "@/lib/types";
import { StatusLevel } from "@/components/ui/status-pill";

const HT_TRANSFORMER_LOSS_FACTOR = 0.985;
const HT_VOLTAGE_RATIO = 11000 / 415;

export interface TransformerElectricals {
  kva: number;
  pf: number;
  voltage: number;
  current: number;
  powerKw: number;
  htVoltage: number;
  htKva: number;
  htCurrent: number;
  hasReadingInPeriod: boolean;
}

export function getTransformerElectricals(
  meter: Pick<MeterWithReading, "latestReading">,
  periodStart?: Date | null
): TransformerElectricals {
  const reading = meter.latestReading;
  
  // If a periodStart is provided, check if the reading is within the period
  let hasReadingInPeriod = false;
  if (reading && periodStart) {
    const readingDate = new Date(reading.recordedAt);
    const now = new Date();
    // Reading is considered "in period" if it's >= periodStart and <= now
    // (or within the last 30 seconds for live data)
    if (readingDate >= periodStart && readingDate <= now) {
      hasReadingInPeriod = true;
    }
  } else if (reading && !periodStart) {
    // No period filter, use the latest reading
    hasReadingInPeriod = true;
  }

  // Only use the reading if it's within the period
  if (!hasReadingInPeriod || !reading) {
    return {
      kva: 0,
      pf: 0.9,
      voltage: 415,
      current: 0,
      powerKw: 0,
      htVoltage: 11000,
      htKva: 0,
      htCurrent: 0,
      hasReadingInPeriod: false,
    };
  }

  const { voltage, current, powerKw } = reading;
  const kva = (Math.sqrt(3) * voltage * current) / 1000;
  const pf = kva > 0 ? Math.min(1.0, powerKw / kva) : 0.9;
  const htVoltage = voltage * HT_VOLTAGE_RATIO;
  const htKva = kva / HT_TRANSFORMER_LOSS_FACTOR;
  const htCurrent = htVoltage > 0 ? (htKva * 1000) / (Math.sqrt(3) * htVoltage) : 0;

  return {
    kva,
    pf,
    voltage,
    current,
    powerKw,
    htVoltage,
    htKva,
    htCurrent,
    hasReadingInPeriod: true,
  };
}

// getTransformerStatus remains unchanged (status is based on setpoints, not date filter)
export function getTransformerStatus(
  meter: Pick<MeterWithReading, "alarmSetpointKva" | "alertSetpointKva">,
  kva: number
): StatusLevel {
  const { alarmSetpointKva, alertSetpointKva } = meter;
  if (alarmSetpointKva == null && alertSetpointKva == null) return "normal";

  if (alertSetpointKva != null && kva >= alertSetpointKva) return "alert";
  if (alarmSetpointKva != null && kva >= alarmSetpointKva) return "alarm";
  return "normal";
}