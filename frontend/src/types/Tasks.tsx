export interface ITask {
	_id?: string;
	title: string;
	description: string;
	createdDate: Date;
	createdBy: string;
	deadline: Date | string;
	isActive: boolean;
	estimationTotal: number;
	estimationUsed: number;
	priority: string;
	category: string;
}
