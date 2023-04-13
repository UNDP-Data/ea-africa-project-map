import { useRef, useState } from 'react';
import { geoMercator } from 'd3-geo';
import World from './data/worldMap.json';
import Data from './data/ea-data.json';
import { Tooltip } from './Tooltip';

interface Props {
  selectedValue: 'AMP' | 'All' | 'Planned';
  labelsLang: object;
}

const COLOR = ['#005396', '#0091A9', '#5FCDA1'];

const CATCOLOR = ['#59BA47', '#FBC412', '#60D4F2'];

export const UnivariateMap = (props:Props) => {
  const {
    selectedValue,
    labelsLang,
  } = props;
  const [hoverData, setHoverData] = useState<any>(undefined);
  const svgWidth = 420;
  const svgHeight = 475;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoMercator().rotate([0, 0]).scale(325).translate([115, 230]);
  return (
    <div className='flex-div flex-hor-align-center'>
      <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`} ref={mapSvg}>
        <g ref={mapG}>
          {
            (World as any).features.map((d: any, i: number) => {
              const index = Data.findIndex((el) => el.Code === d.properties.ISO3);
              if ((index === -1) || d.properties.NAME === 'Antarctica') return null;
              return (
                <g
                  key={i}
                  opacity={hoverData ? hoverData.country === Data[index].Country ? 1 : 0.1 : 1}
                  onMouseEnter={(event) => {
                    setHoverData({
                      country: Data[index].Country,
                      value: Data[index].Value,
                      AMP: Data[index].AMP,
                      AO: Data[index].Planned,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      labels: labelsLang,
                    });
                  }}
                  onMouseMove={(event) => {
                    setHoverData({
                      country: Data[index].Country,
                      value: Data[index].Value,
                      AMP: Data[index].AMP,
                      AO: Data[index].Planned,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      labels: labelsLang,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverData(undefined);
                  }}
                >
                  {
                    d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          stroke='#888'
                          strokeWidth={0.25}
                          fill={selectedValue === 'All' ? Data[index].AMP && Data[index].Planned ? CATCOLOR[0] : Data[index].AMP ? CATCOLOR[1] : Data[index].Planned ? CATCOLOR[2] : '#EDEDED' : Data[index][selectedValue] ? COLOR[Data[index][selectedValue] as number - 1] : '#EDEDED'}
                        />
                      );
                    }) : d.geometry.coordinates.map((el:any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#888'
                          strokeWidth={0.25}
                          fill={selectedValue === 'All' ? Data[index].AMP && Data[index].Planned ? CATCOLOR[0] : Data[index].AMP ? CATCOLOR[1] : Data[index].Planned ? CATCOLOR[2] : '#EDEDED' : Data[index][selectedValue] ? COLOR[Data[index][selectedValue] as number - 1] : '#EDEDED'}
                        />
                      );
                    })
                  }
                </g>
              );
            })
          }
        </g>
      </svg>
      {
        hoverData ? <Tooltip data={hoverData} /> : null
      }
    </div>
  );
};
