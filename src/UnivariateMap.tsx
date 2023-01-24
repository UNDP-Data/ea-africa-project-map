import { useRef, useState } from 'react';
import { geoMercator } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import World from './data/worldMap.json';
import Data from './data/ea-data.json';
import { Tooltip } from './Tooltip';

interface Props {
  selectedValue: 'AMP' | 'All' | 'Planned';
}

const COLOR = ['#3a6b35', '#829d60', '#cbd18f'];

const CATCOLOR = ['#0B5588', '#FBB719', '#88C59A'];

export const UnivariateMap = (props:Props) => {
  const { selectedValue } = props;
  const [hoverData, setHoverData] = useState<any>(undefined);
  const svgWidth = 420;
  const svgHeight = 475;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const heightScale = scaleLinear().domain([0, 90000000]).range([0, 190]);
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
                          stroke='#AAA'
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
                          stroke='#AAA'
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
        <g>
          {
            (World as any).features.map((d: any, i: number) => {
              const index = Data.findIndex((el) => el.Code === d.properties.ISO3);
              if ((index === -1) || d.properties.NAME === 'Antarctica') return null;
              if (selectedValue === 'All' && !Data[index].AMP && !Data[index].Planned) return null;
              if (selectedValue !== 'All' && !Data[index][selectedValue]) return null;
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
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverData(undefined);
                  }}
                >
                  <rect
                    x={(projection([d.properties.LON, d.properties.LAT]) as [number, number])[0] - 2}
                    y={(projection([d.properties.LON, d.properties.LAT]) as [number, number])[1] - heightScale(Data[index].Value)}
                    width={4}
                    height={heightScale(Data[index].Value)}
                    fill='#006EB5'
                    stroke='#fff'
                    strokeWidth={0.5}
                  />
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
