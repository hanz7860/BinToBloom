<<<<<<< HEAD
'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const
=======
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
<<<<<<< HEAD
    throw new Error('useChart must be used within a <ChartContainer />')
=======
    throw new Error("useChart must be used within a <ChartContainer />")
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
<<<<<<< HEAD
  React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children']
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`
=======
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
<<<<<<< HEAD
ChartContainer.displayName = 'Chart'

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
=======
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
<<<<<<< HEAD
  .join('\n')}
}
`
          )
          .join('\n'),
=======
  .join("\n")}
}
`
          )
          .join("\n"),
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
<<<<<<< HEAD
    React.ComponentProps<'div'> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: 'line' | 'dot' | 'dashed'
=======
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
<<<<<<< HEAD
      indicator = 'dot',
=======
      indicator = "dot",
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
<<<<<<< HEAD
      const key = `${labelKey || item.dataKey || item.name || 'value'}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === 'string'
=======
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
<<<<<<< HEAD
          <div className={cn('font-medium', labelClassName)}>
=======
          <div className={cn("font-medium", labelClassName)}>
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

<<<<<<< HEAD
      return <div className={cn('font-medium', labelClassName)}>{value}</div>
=======
      return <div className={cn("font-medium", labelClassName)}>{value}</div>
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

<<<<<<< HEAD
    const nestLabel = payload.length === 1 && indicator !== 'dot'
=======
    const nestLabel = payload.length === 1 && indicator !== "dot"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

    return (
      <div
        ref={ref}
        className={cn(
<<<<<<< HEAD
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
=======
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
<<<<<<< HEAD
            const key = `${nameKey || item.name || item.dataKey || 'value'}`
=======
            const key = `${nameKey || item.name || item.dataKey || "value"}`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
<<<<<<< HEAD
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                  indicator === 'dot' && 'items-center'
=======
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
<<<<<<< HEAD
                            'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                            {
                              'h-2.5 w-2.5': indicator === 'dot',
                              'w-1': indicator === 'line',
                              'w-0 border-[1.5px] border-dashed bg-transparent':
                                indicator === 'dashed',
                              'my-0.5': nestLabel && indicator === 'dashed',
=======
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
                            }
                          )}
                          style={
                            {
<<<<<<< HEAD
                              '--color-bg': indicatorColor,
                              '--color-border': indicatorColor,
=======
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
<<<<<<< HEAD
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center'
=======
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
<<<<<<< HEAD
ChartTooltipContent.displayName = 'ChartTooltip'
=======
ChartTooltipContent.displayName = "ChartTooltip"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
<<<<<<< HEAD
  React.ComponentProps<'div'> &
    Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
=======
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
<<<<<<< HEAD
    { className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey },
=======
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
<<<<<<< HEAD
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
=======
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
          className
        )}
      >
        {payload.map((item) => {
<<<<<<< HEAD
          const key = `${nameKey || item.dataKey || 'value'}`
=======
          const key = `${nameKey || item.dataKey || "value"}`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
<<<<<<< HEAD
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground'
=======
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
<<<<<<< HEAD
ChartLegendContent.displayName = 'ChartLegend'
=======
ChartLegendContent.displayName = "ChartLegend"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
<<<<<<< HEAD
  if (typeof payload !== 'object' || payload === null) {
=======
  if (typeof payload !== "object" || payload === null) {
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
    return undefined
  }

  const payloadPayload =
<<<<<<< HEAD
    'payload' in payload &&
    typeof payload.payload === 'object' &&
=======
    "payload" in payload &&
    typeof payload.payload === "object" &&
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
<<<<<<< HEAD
    typeof payload[key as keyof typeof payload] === 'string'
=======
    typeof payload[key as keyof typeof payload] === "string"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
<<<<<<< HEAD
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
=======
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
