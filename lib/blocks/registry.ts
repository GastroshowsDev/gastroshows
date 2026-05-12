import { BlockType, BlockData, BlockContent } from "./types";
import React from "react";

/**
 * Registry interface for block definitions.
 * This allows adding new blocks without touching the core engine.
 */
export type BlockDefinition = {
  type: BlockType;
  label: string;
  icon: string;
  description: string;
  // The component that renders the block in the public site
  component: React.ComponentType<{ id: string; content: any; isEditing?: boolean; onUpdate?: (content: any) => void }>;
  // The controls shown in the sidebar for this block
  propertyPanel?: React.ComponentType<{ content: any; onChange: (content: any) => void }>;
  // Default data when creating this block
  defaults: any;
};

class BlockRegistry {
  private blocks: Map<string, BlockDefinition> = new Map();

  register(definition: BlockDefinition) {
    this.blocks.set(definition.type, definition);
  }

  get(type: string): BlockDefinition | undefined {
    return this.blocks.get(type);
  }

  getAll(): BlockDefinition[] {
    return Array.from(this.blocks.values());
  }
}

export const blockRegistry = new BlockRegistry();
