export default interface ILoanData {
  loanId: string;
  dateTaken: Date;
  dateReturned: Date;
  dueDate: Date;
  returned: boolean;
}
