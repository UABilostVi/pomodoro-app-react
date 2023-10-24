export interface ITask {
	_id: string;
	title: string;
	description: string;
	category: string;
	deadline: Date;
	createdDate: Date;
	createdBy: string;
	isActive: boolean;
	estimationTotal: number;
	estimationUsed: number;
	priority: string;
	done: boolean;
}
