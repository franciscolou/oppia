// Copyright 2016 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import cloneDeep from 'lodash/cloneDeep';
import {Injectable} from '@angular/core';
import {downgradeInjectable} from '@angular/upgrade/static';

// Classe LegendGraph com métodos de acesso e manipulação.
export class LegendGraph {
  nodes: Record<string, string>;
  links: {
    source: string;
    target: string;
    linkProperty: string;
  }[];
  finalStateIds: string[];
  initStateId: string;

  constructor(
    nodes: Record<string, string>,
    links: {source: string; target: string; linkProperty: string}[],
    finalStateIds: string[],
    initStateId: string
  ) {
    this.nodes = nodes;
    this.links = links;
    this.finalStateIds = finalStateIds;
    this.initStateId = initStateId;
  }

  // Method for cloning the current instance of LegendGraph object.
  clone(): LegendGraph {
    return new LegendGraph(
      cloneDeep(this.nodes),
      cloneDeep(this.links),
      cloneDeep(this.finalStateIds),
      this.initStateId
    );
  }

  getNodes(): Record<string, string> {
    return this.nodes;
  }

  addNode(nodeId: string, nodeName: string): void {
    this.nodes[nodeId] = nodeName;
  }

  removeNode(nodeId: string): void {
    delete this.nodes[nodeId];
  }

  addLink(source: string, target: string, linkProperty: string): void {
    this.links.push({source, target, linkProperty});
  }

  removeLink(source: string, target: string): void {
    this.links = this.links.filter(
      link => link.source !== source || link.target !== target
    );
  }

  getFinalStateIds(): string[] {
    return this.finalStateIds;
  }

  getInitStateId(): string {
    return this.initStateId;
  }
}

// Factory
@Injectable({
  providedIn: 'root',
})
export class LegendGraphObjectFactory {
  create(
    nodes: Record<string, string>,
    links: {source: string; target: string; linkProperty: string}[],
    finalStateIds: string[],
    initStateId: string
  ): LegendGraph {
    return new LegendGraph(nodes, links, finalStateIds, initStateId);
  }
}

angular
  .module('oppia')
  .factory(
    'LegendGraphObjectFactory',
    downgradeInjectable(LegendGraphObjectFactory)
  );
