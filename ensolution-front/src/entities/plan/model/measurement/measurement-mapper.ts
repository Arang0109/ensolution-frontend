import type {
  PlanDraftEditForm, DraftUpdateRequest
} from "@/entities/plan/model";

export const mapDraftFormToRequest = (
  form: PlanDraftEditForm
): DraftUpdateRequest => ({
  referenceNumber: form.planInfo.referenceNumber,
  measureDate: form.planInfo.measureDate,
  receivedDate: form.planInfo.receivedDate,
  analysisDate: form.planInfo.analysisDate,
  measurementField: form.planInfo.measurementField,
  measurementType: form.planInfo.measurementType,
  teamName: form.planInfo.teamName,
  vehicleNumber: form.planInfo.vehicleNumber,
  mentor: form.planInfo.mentor,
  mentee: form.planInfo.mentee,
  measureStartTime: form.planInfo.measureStartTime,
  measureEndTime: form.planInfo.measureEndTime,

  client: {
    company: {
      companyName: form.planInfo.companyName,
      workplaceName: form.planInfo.workplaceName,
      ceoName: form.planInfo.ceoName,
      address: form.planInfo.address,
      bizNumber: form.planInfo.bizNumber,
      manager: form.planInfo.manager,
      businessCategory: form.planInfo.businessCategory,
      grade: form.planInfo.workplaceGrade,
    },
    stack: {
      name: form.planInfo.stackName,
      semsNumber: form.planInfo.semsNumber,
      height: form.planInfo.height,
      horizontalLength: form.planInfo.horizontalLength,
      verticalLength: form.planInfo.verticalLength,
      shape: form.planInfo.shape,
      orientation: form.planInfo.orientation,
      standardOxygen: form.planInfo.standardOxygen,
      grade: form.planInfo.stackGrade,
    },
  },

  particleSamplerId: form.equipment.particleSamplerId,
  gasSamplerId: form.equipment.gasSamplerId,
  pitotTubeId: form.equipment.pitotTubeId,
  nozzleId: form.equipment.nozzleId,

  measurementItems: form.measurementItems.map((m) => ({
    stackMeasurementId: m.stackMeasurementId,
    pollutantId: m.pollutantId,
    pollutantNameKr: m.pollutantNameKr,
    pollutantNameEn: m.pollutantNameEn,
    method: m.method,
    testEquipment: m.testEquipment,
    testMethod: m.testEquipment,
    samplingTime: m.samplingTime,
    samplingVolume: m.samplingVolume,
    cycle: m.cycle,
    allowance: m.allowance,
  })),

  sheets: form.sheets.map((sheet) => ({
    category: sheet.category,
    referenceNumber: sheet.referenceNumber,

    weather: {
      pressure: {
        pressure: sheet.weather.pressure,
        unit: sheet.weather.unit
      },
      weatherCondition: sheet.weather.weatherCondition,
      temperature: sheet.weather.temperature,
      humidity: sheet.weather.humidity,
      windDirection: sheet.weather.windDirection,
      windSpeed: sheet.weather.windSpeed
    },

    moisture: {
      weight: {
        before: sheet.moisture.beforeWeight,
        after: sheet.moisture.afterWeight
      },
      gasMeterTemperature: {
        in: sheet.moisture.inTemperature,
        out: sheet.moisture.outTemperature
      },
      dryGasVolume: {
        before: sheet.moisture.beforeDryVolume,
        after: sheet.moisture.afterDryVolume
      },

      suctionVelocity: sheet.moisture.suctionVelocity,
      gasMeterGaugePressure: sheet.moisture.gasMeterGaugePressure
    },

    exhaustGas: {
      o2Concentration: sheet.exhaustGas.o2Concentration,
      co2Concentration: sheet.exhaustGas.co2Concentration,
      coConcentration: sheet.exhaustGas.coConcentration,
      noxConcentration: sheet.exhaustGas.noxConcentration,
      soxConcentration: sheet.exhaustGas.soxConcentration
    },

    measurementPoints: sheet.measurementPoints.map((mp) => ({
      Ts: mp.Ts,
      Pv: mp.Pv,
      Ps: mp.Ps,

      equipmentTemperature: {
        inTm: mp.inTm,
        outTm: mp.outTm,
      },

      equipmentVolume: {
        beforeVm: mp.beforeVm,
        afterVm: mp.afterVm,
      },

      samplingTime: mp.samplingTime,
      vacuumGaugePressure: mp.vacuumGaugePressure,
      finalImpingerTemperature: mp.finalImpingerTemperature,
    })),

    samples: sheet.samples.map((sheet) => ({
      startTime: sheet.startTime,
      endTime: sheet.endTime,
      suctionQuantity: sheet.suctionQuantity,
      gasMeterGaugePressure: sheet.gasMeterGaugePressure,
      inTemperature: sheet.inTemperature,
      outTemperature: sheet.outTemperature,
      beforeVolume: sheet.beforeVolume,
      afterVolume: sheet.afterVolume,
      blankSampleNumber: sheet.blankSampleNumber,
      sampleNumber: sheet.sampleNumber,
      samplingVolume: sheet.samplingVolume,
    })),

    particleSample: {
      Cp: sheet.particleSample.Cp,
      nozzleSize: sheet.particleSample.nozzleSize,
      Vm: sheet.particleSample.Vm,
      samplingTime: sheet.particleSample.samplingTime,
      kFactor: sheet.particleSample.kFactor,
      orificeDp: sheet.particleSample.orificeDp,
      isokineticRatio: sheet.particleSample.isokineticRatio,
      samplingStartTime: sheet.particleSample.samplingStartTime,
      samplingEndTime: sheet.particleSample.samplingEndTime
    },

    quantity: sheet.quantity
  }))
});