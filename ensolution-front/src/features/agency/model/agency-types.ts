export interface TeamResponse {
  id: number;
  name: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string
  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}

export interface TeamRegisterRequest {
  name: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string
  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}

export interface TeamUpdateRequest {
  name: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string
  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}