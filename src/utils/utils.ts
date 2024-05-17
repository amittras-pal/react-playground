import { DirElement } from "../types/types";

export function addElement(
  tree: DirElement[],
  entry: DirElement,
  childOf?: string
): DirElement[] {
  // when adding to root
  if (!childOf) return [entry, ...tree].sort(sortNodes);

  // when adding to a nested directory
  const index = tree.findIndex((node) => node.id === childOf);
  if (index > -1) {
    const update = [...tree];
    update[index].children = [entry, ...(update[index].children ?? [])].sort(
      sortNodes
    );
    return update;
  }

  // When parent is not found in the current level
  return tree.map((node) => ({
    ...node,
    children: node.children
      ? addElement(node.children, entry, childOf)
      : undefined,
  }));
}

export function removeElement(tree: DirElement[], id: string): DirElement[] {
  // Find item to delete in the current level
  const index = tree.findIndex((node) => node.id === id);
  if (index > -1) return tree.filter((_, i) => i !== index);

  // Find items in the sub-directory.
  return tree.map((node) => ({
    ...node,
    children: node.children ? removeElement(node.children, id) : undefined,
  }));
}

function sortNodes(a: DirElement, b: DirElement) {
  return b.type.localeCompare(a.type) || a.name.localeCompare(b.name);
}
