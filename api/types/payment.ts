import { Document } from 'mongoose';

export interface PaymentType extends Document {
    _id: string;
    studentClass: string;
    studentId: string;
    studentName: string;
    amount: number;
    fieldType: string;
    feeType?: string;
    status: string;
    paymentDate: Date; // Assuming paymentDate is a Date
  }

  export interface ClassType extends Document {
    _id: string;
    className: string;
    classTeacher?: string | null;
    seatsAvailable?: number | null;
  }
