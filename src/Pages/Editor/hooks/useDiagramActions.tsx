import {
  BaseModel,
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  LinkModel,
  NodeModel,
} from '@projectstorm/react-diagrams';
import { calculateGridSize } from '../../../helpers/calculateGridSize';
import useLocalStorage from '../../../common/hooks/useLocalStorage';
import { DiagramSerializeType } from '../../../common/types/diagram.types';
import { useNotification } from '../../../components/Notification/NotificationContext';

interface useDiagramActionsReturn {
  createNode: (name: string, color: string) => DefaultNodeModel;
  linkNodes: (node1: NodeModel, node2: NodeModel) => void;
  addNode: (name: string, color: string, connectNodeName?: string) => void;
  clearNodes: () => void;
  deleteSelectedNodes: () => void;
  cloneSelected: () => void;
  lockModel: () => void;
  unlockModel: () => void;
}

export const useDiagramActions = (
  engine: DiagramEngine,
  model: DiagramModel,
): useDiagramActionsReturn => {
  const [, setLocalStorageDiagramModel] = useLocalStorage<DiagramSerializeType>(
    'diagram',
    model.serialize(),
  );
  const { triggerNotification } = useNotification();

  const linkNodes = (node1: NodeModel, node2: NodeModel) => {
    const link = new DefaultLinkModel();
    link.setSourcePort(node1.getPort('Out'));
    link.setTargetPort(node2.getPort('In'));
    model.addLink(link);
  };

  const clearNodes = () => {
    const model = engine.getModel();
    model.getNodes().forEach((node) => {
      model.removeNode(node);
    });
    model.getLinks().forEach((link) => {
      model.removeLink(link);
    });

    engine.setModel(model);
    setLocalStorageDiagramModel(model.serialize());
    engine.repaintCanvas();
    triggerNotification('clearBoard');
  };

  const calculateNodePosition = (
    allNodes: NodeModel[],
    connectNodeName?: string,
  ) => {
    const gridSize = calculateGridSize();
    let x = 0,
      y = 0;

    if (connectNodeName) {
      const connectNode = allNodes.find(
        (node) => node.getOptions().extras.name === connectNodeName,
      );
      if (connectNode) {
        const angle =
          (allNodes.length * 360) /
          (allNodes.filter(
            (node) => node.getOptions().extras.name !== connectNodeName,
          ).length || 1);
        const radius = gridSize * 2;
        x = connectNode.getPosition().x + radius * Math.cos(angle);
        y = connectNode.getPosition().y + radius * Math.sin(angle);
      }
    } else {
      const canvasWidth =
        document.querySelector('.canvas-container')?.clientWidth ||
        window.innerWidth - 300;
      const nodesPerRow = Math.floor(canvasWidth / gridSize);
      x = (allNodes.length % nodesPerRow) * gridSize + gridSize;
      y = Math.floor(allNodes.length / nodesPerRow) * gridSize + gridSize;
    }

    return { x, y };
  };

  const addNode = (name: string, color: string, connectNodeName?: string) => {
    const allNodes = model.getNodes();
    const node = createNode(name, color);

    const position = calculateNodePosition(allNodes, connectNodeName);
    node.setPosition(position.x, position.y);

    model.addNode(node);
    engine.setModel(model);

    if (connectNodeName) {
      const nodeToConnect = allNodes.find(
        (node) => node.getOptions().extras.name === connectNodeName,
      );
      if (nodeToConnect) {
        linkNodes(node, nodeToConnect);
      }
    }
    setLocalStorageDiagramModel(model.serialize());
    triggerNotification('addItem');

    engine.repaintCanvas();
  };

  const deleteSelectedNodes = () => {
    const selectedEntities = model.getSelectedEntities();

    if (!selectedEntities.length) {
      triggerNotification('noItems');
      return;
    }

    selectedEntities.forEach((entity) => {
      if (entity instanceof DefaultNodeModel) {
        const ports = Object.values(entity.getPorts());
        ports.forEach((port) => {
          const links = Object.values(port.getLinks());
          links.forEach((link) => {
            model.removeLink(link);
          });
        });
        model.removeNode(entity);
      }
    });

    engine.setModel(model);
    setLocalStorageDiagramModel(model.serialize());
    engine.repaintCanvas();

    triggerNotification('deleteItem');
  };

  const createNode = (name: string, color: string): DefaultNodeModel => {
    const node = new DefaultNodeModel({ color, name, extras: { name } });
    node.addInPort('In');
    node.addOutPort('Out');

    return node;
  };

  const cloneSelected = () => {
    const offset = { x: 100, y: 100 };
    const model = engine.getModel();

    const selectedEntities = model.getSelectedEntities();

    if (!selectedEntities.length) {
      triggerNotification('noItems');
      return;
    }

    const itemMap = {};
    model.getSelectedEntities().forEach((item: BaseModel) => {
      const newItem = item.clone(itemMap);

      if (newItem instanceof NodeModel) {
        newItem.setPosition(
          newItem.getX() + offset.x,
          newItem.getY() + offset.y,
        );
        model.addNode(newItem);
      } else if (newItem instanceof LinkModel) {
        newItem.getPoints().forEach((p) => {
          p.setPosition(p.getX() + offset.x, p.getY() + offset.y);
        });
        model.addLink(newItem);
      }
      (newItem as BaseModel).setSelected(false);
    });

    engine.setModel(model);
    setLocalStorageDiagramModel(model.serialize());
    engine.repaintCanvas();

    triggerNotification('cloneItem');
  };

  const lockModel = () => {
    model.setLocked(true);
    engine.setModel(model);
    setLocalStorageDiagramModel(model.serialize());
    triggerNotification('lockModel');
  };

  const unlockModel = () => {
    model.setLocked(false);
    engine.setModel(model);
    setLocalStorageDiagramModel(model.serialize());
    triggerNotification('unlockModel');
  };

  return {
    createNode,
    linkNodes,
    addNode,
    clearNodes,
    deleteSelectedNodes,
    cloneSelected,
    lockModel,
    unlockModel,
  };
};
