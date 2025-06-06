export interface CourseTreeNode {
  id: number;
  name: string;
  parent_id: number;
  children?: CourseTreeNode[];
}