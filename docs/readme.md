# JetFast Readme

## Overview

JetFast is a CSS + JS framework designed for **Rapid Web Development**.  
It has a **gentle learning curve**, and when combined with any class suggestion extension like IntelliSense, it becomes extremely fast even with its large and self-explanatory class names.

## Config

### Development

> To enable purge and arbitrary generator run this in development mode
>
> ```cmd
> npm install jetfast
> npx jetfast init
> npm run dev
> ```
>
> and link your file with the `arbitrary-jet.css` and `output.css` present in `node_modules\jetfast\outputDev` in development

### Production

> Unlink your files with `arbitrary-jet.css` and `output.css` present in `node_modules\jetfast\outputDev`
> Run
>
> ```cmd
> npm run build
> ```
>
> Copy and paste the output inside `node_modules\jetfast\outputDev` into any directory you want and link your files with that output file
>
> and in production, link it with `output.css` present in `JetFast.output`

## Prefix System

This framework uses prefix a system. Below are some example classes

1. `DJ-display-flex`
1. `CJ-color-red`
1. `AJ-background-color:#111`

In the first case, the prefix is DJ; in the second, it is CJ; and in the third, it is AJ.

Given below is a table which gives more information about each prefix

| Prefix |                           Use                           |
| :----: | :-----------------------------------------------------: |
|   AJ   |             Used to create arbitrary values             |
|   BJ   |                 Used to control borders                 |
|   CJ   |                  Used to control color                  |
|   DJ   |                 Used to control Display                 |
|   EJ   |                    Used for Ejection                    |
|   FJ   |                Used for controlling font                |
|   GJ   |               Used to enable and use Grid               |
|   OJ   |               Used for handling overflow                |
|   PJ   |                 Used to control padding                 |
|   SJ   |      Used for changing size like width and height       |
|   TJ   | Used to control text like alignment and text decoration |
|   VJ   |           Used to change Opacity and Z-index            |

## System Syntax

The syntax is simple
The syntax below is for non-arbitrary classes  
`prefix-property-${value}` or `prefix-property-${value}-in-${device}` and the prefix always ends with the letter J  
For arbitrary classes, use  
`AJ-property:${value}`

## Arbitrary Jet

It is used to create arbitrary values. It has been introduced because there are thousands of css properties and each one has hundreds, thousands, or infinite values. It is **impossible** to cover all of them even with the help of massive duplication so we introduced arbitrary values. The syntax is `AJ-property:${value}`.

## Border Jet

It is used to add borders. If you want to add simple borders specify the width with `BJ-border-width-${value}`, style with `BJ-border-style-${value}` and color with `BJ-border-color-${value}`. You can also change the border radius with `BJ-border-radius-${value}`. If any class is not available feel free to use **Arbitrary Jet**.

## Color Jet

It is used to deal with colors. For changing colors use `CJ-color-${color}-${shade}` and for background color use `CJ-background-color-${color}-${shade}`. You can use **Arbitrary Jet** for Color Jet and any other Jet if class is not available.

## Display Jet

It is used to change the display. Use `DJ-display-${value}` to change the display. In case the display is flex you can use `DJ-justify-content-${value}` and `DJ-align-items-${value}`. Note that **grid display** is not part of Display Jet.

## Font Jet

It is used to deal with fonts. You can change the font size with `FJ-size-${value}`, font weight with `FJ-${value}` and font with `FJ-font-${value}`.

## Grid Jet

It is used to deal with **grid display**. If you want to use it apply `GJ-grid-body` on body tag. Below is the structural overview of the grid body.
<img src="./img/Grid Overview.png" alt="Structure Overview of Grid Body" width="1000" height="600">

You can specify the grid area by using `GJ-grid-area-${value}`. Available values include

- nav
- content
- empty
- sidebar
- footer

If you want to use display grid on a normal container use `GJ-grid`. To specify number of rows and columns use `GJ-grid-template-rows-${value}` and `GJ-grid-template-columns-${value}`. Value can be between 1 to 12. Use `GJ-span-columns-${column-start}-${column-end}` and `GJ-span-row-${row-start}-${row-end}` to specify grid-column and grid-row.

## Overflow Jet

It is used to specify the overflow. Use `OJ-${x|y}-${hidden|visible|auto|scroll}`.

## Positioning Jet

It is used to control padding and margin. Use `PJ-${property}-${value}`, property can be padding or margin or padding-right or padding-left or padding-top or padding-bottom same for margin. You can also use padding left and right, or top and bottom; same for margin.

## Size Jet

It is used to control the size of a container. Use `SJ-${property}-${value}`. Property can be width or height and value can be full or screen or auto or min or max or fit or number. You can also use `SJ-${property}-${fraction}-of-parent `. Property can be width or height and value can be a fraction as name suggests like 15/22 or 1/2 etc.

## Text Jet

It is used to handle and perform operations on text. You can use `TJ-decoration-${value}` or `TJ-list-style-${value}` or `TJ-font-${value}` or `TJ-font-style-${value}` or `TJ-text-align-${value}` or `TJ-font-weight-${value}` or `TJ-always-at-${top or bottom}`.

## Values Jet

It is used to control the opacity or z-index. Use `VJ-z-index-${index}` or `VJ-opacity-${index}`.

## Responsiveness

Add `in-${device-name}` to a class to specify the device and make the website responsive.

Remember to use **CSS class suggestion extensions** for better usage.

## Links

- ### [Examples](examples.md)
