import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { MEASUREMENT_FIELD, type MeasurementField } from "@entities/plan/model";

import type { PlanTableResponse } from "@entities/plan/model";

import {
  Card,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";

interface PlanTableMobileProps {
  plans: PlanTableResponse[]
}

export const PlanTableMobile = ({ plans }: PlanTableMobileProps) => {

  return (
  <>
    {plans.map((plan, index) => {
      const isToday = plan.measureDate === new Date().toISOString().slice(0, 10);

      return (
        <Fragment key={index}>
          <Card className={`
            mt-6 w-full border border-blue-gray-900
            ${isToday ? "bg-blue-gray-100" : "" }
          `}>
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-2 flex justify-between">
                <div>
                  {plan.measureDate}
                </div>
                <Link to={`/plan/${plan.id}`}>
                  <Chip value={MEASUREMENT_FIELD[plan.measurementField as MeasurementField]} color="blue" />
                </Link>
              </Typography>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                {[
                  [plan.workplaceName],
                  [plan.stackName],
                  [plan.teamName],
                ].map(([value], index) => (
                  <Fragment key={index}>
                    <p className="text-blue-gray-800 font-medium">{value}</p><br/>
                  </Fragment>
                ))}
              </div>
            </CardBody>
          </Card>
        </Fragment>
      )
    })}
  </>
  );
}