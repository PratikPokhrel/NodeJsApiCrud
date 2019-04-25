
export class WorkFlow {
  id: string;
  name: string;
  workFlowActions: TemplateItem[];
  createdBy: string;
  createdOn: Date;
  totalAction: number
}

export class TemplateItem {
  id: string;
  actionName: string;
  status: TemplateStatus[];
  users: User[];
  userIdList: string[];
  actionStatus: string[];
  hasUserAssigned: boolean;
  isCreatedByUser:boolean;
}

export class User {
  id: string;
  name: string
}
export class TemplateStatus {
  id: string;
  name: string;
}

export class WorkFlowRule {
  workFlowActionId: string;
  startAction: string;
  resultingActionId: string;
  endAction: string;
  statusId: string;
  condition: string;
  userId: string;
}


export class workFlowActionLog{
  workFlowActionId: string;
  statusId: string;
  userId: string
  statusName: string;
  userName: string;
  workFlowActionName: string;
}
