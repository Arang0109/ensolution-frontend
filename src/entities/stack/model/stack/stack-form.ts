import type { Shape, Orientation } from '@entities/stack/model';
import type { Grade } from '@shared/model';
import { DEFAULT_GRADE } from '@entities/workplace/model';

export const DEFAULT_SHAPE: Shape = "RECTANGULAR";
export const DEFAULT_ORIENTATION: Orientation = "VERTICAL";

export interface StackCreateForm {
  workplaceId: number;
  name: string;
  semsNumber: string;
  grade: Grade;
  height: string;
  horizontalLength: string;
  verticalLength: string;
  shape: Shape;
  orientation: Orientation;
  remark: string;
}

export const getDefaultStackCreateForm = (workplaceId: number): StackCreateForm => ({
  workplaceId: workplaceId,
  name: "",
  semsNumber: "",
  grade: DEFAULT_GRADE,
  height: "",
  horizontalLength: "",
  verticalLength: "",
  shape: DEFAULT_SHAPE,
  orientation: DEFAULT_ORIENTATION,
  remark: "",
});

export interface StackUpdateForm {
  workplaceId: number;
  name: string;
  semsNumber: string;
  grade: Grade;
  height: string;
  horizontalLength: string;
  verticalLength: string;
  shape: Shape;
  orientation: Orientation;
  remark: string;
}

export const getDefaultStackUpdateForm = (workplaceId: number): StackUpdateForm => ({
  workplaceId: workplaceId,
  name: "",
  semsNumber: "",
  grade: DEFAULT_GRADE,
  height: "",
  horizontalLength: "",
  verticalLength: "",
  shape: DEFAULT_SHAPE,
  orientation: DEFAULT_ORIENTATION,
  remark: "",
});