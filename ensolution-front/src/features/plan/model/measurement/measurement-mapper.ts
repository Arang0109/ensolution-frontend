import type {
  PlanDraftEditForm, DraftUpdateRequest
} from "@plan/model";

export const mapDraftFormToRequest = (
  form: PlanDraftEditForm
): DraftUpdateRequest => ({
  preInfo: {
    referenceNumber: form.preInfo.referenceNumber,
    measureDate: form.preInfo.measureDate,
    measurementField: form.preInfo.measurementField,
    measurementType: form.preInfo.measurementType,
    teamName: form.preInfo.teamName,
    vehicleNumber: form.preInfo.vehicleNumber,
    mentor: form.preInfo.mentor,
    mentee: form.preInfo.mentee,
  },

  client: {
    company: {
      companyName: form.preInfo.companyName,
      workplaceName: form.preInfo.workplaceName,
      ceoName: form.preInfo.ceoName,
      address: form.preInfo.address,
      bizNumber: form.preInfo.bizNumber,
      manager: form.preInfo.manager,
      businessCategory: form.preInfo.businessCategory,
      grade: form.preInfo.workplaceGrade,
    },
    stack: {
      name: form.preInfo.stackName,
      semsNumber: form.preInfo.semsNumber,
      height: form.preInfo.height,
      horizontalLength: form.preInfo.horizontalLength,
      verticalLength: form.preInfo.verticalLength,
      shape: form.preInfo.shape,
      orientation: form.preInfo.orientation,
      standardOxygen: form.preInfo.standardOxygen,
      grade: form.preInfo.stackGrade,
    },
  },

  measurementItems: form.measurementItems.measurementItems,

  particleSamplerId: form.equipment.particleSamplerId,
  gasSamplerId: form.equipment.gasSamplerId,
  pitotTubeId: form.equipment.pitotTubeId,
  nozzleId: form.equipment.nozzleId,

  weather: {
    pressure: {
      pressure: form.fieldData.weather.pressure,
      unit: form.fieldData.weather.unit
    },
    weatherCondition: form.fieldData.weather.weatherCondition,
    temperature: form.fieldData.weather.temperature,
    humidity: form.fieldData.weather.humidity,
    windDirection: form.fieldData.weather.windDirection,
    windSpeed: form.fieldData.weather.windSpeed
  },

  moisture: {
    weight: {
      before: form.fieldData.moisture.beforeWeight,
      after: form.fieldData.moisture.afterWeight
    },
    gasMeterTemperature: {
      in: form.fieldData.moisture.inTemperature,
      out: form.fieldData.moisture.outTemperature
    },
    dryGasVolume: {
      before: form.fieldData.moisture.beforeDryVolume,
      after: form.fieldData.moisture.afterDryVolume
    },

    suctionVelocity: form.fieldData.moisture.suctionVelocity,
    gasMeterGaugePressure: form.fieldData.moisture.gasMeterGaugePressure
  },

  exhaustGas: {
    o2Concentration: form.fieldData.exhaustGas.o2Concentration,
    co2Concentration: form.fieldData.exhaustGas.co2Concentration,
    coConcentration: form.fieldData.exhaustGas.coConcentration,
    noxConcentration: form.fieldData.exhaustGas.noxConcentration,
    soxConcentration: form.fieldData.exhaustGas.soxConcentration
  }
});