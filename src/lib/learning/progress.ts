export function calculateProgress(completedCount: number, moduleCount: number) {
  return moduleCount ? Math.round((completedCount / moduleCount) * 100) : 0;
}
