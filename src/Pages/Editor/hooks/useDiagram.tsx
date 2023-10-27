import React, { useEffect } from 'react';
import createEngine, {
  DiagramEngine,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import { calculateGridSize } from '../../../helpers/calculateGridSize';
import useLocalStorage from '../../../common/hooks/useLocalStorage';
import { DiagramSerializeType } from '../../../common/types/diagram.types';

interface UseDiagramReturnType {
  engine: ReturnType<typeof createEngine>;
  model: DiagramModel;
}

const useDiagram = (): UseDiagramReturnType => {
  const engine: DiagramEngine = React.useMemo(() => createEngine(), []);

  const model: DiagramModel = React.useMemo(() => {
    const model = new DiagramModel();
    model.setGridSize(calculateGridSize());
    engine.setModel(model);

    return model;
  }, [engine]);

  const [localStorageDiagramModel] = useLocalStorage<DiagramSerializeType>(
    'diagram',
    model.serialize(),
  );

  useEffect(() => {
    if (localStorageDiagramModel) {
      model.deserializeModel(localStorageDiagramModel, engine);
      engine.setModel(model);
    }
  }, [engine, localStorageDiagramModel, model]);

  return {
    engine,
    model,
  };
};

export default useDiagram;
