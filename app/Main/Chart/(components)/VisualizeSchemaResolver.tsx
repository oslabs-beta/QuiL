"use client";
import React, { useState } from "react";
import Schema from "./Schema";
import Resolver from "./Resolver";
import { VisualizeSchemaResolverProps } from "../../../(root)/frontendTypes";
const VisualizeSchemaResolver = ({
  displayMode,
  resQL,
}: VisualizeSchemaResolverProps): JSX.Element => {
  let modeComponent;
  switch (displayMode) {
    case "schemaMode":
      modeComponent = <Schema resQL={resQL} />;

      break;
    case "resolverMode":
      modeComponent = <Resolver resQL={resQL} />;
      break;
    default:
      modeComponent = null;
  }
  return <div className="min-w-full max-w-fit">{modeComponent}</div>;
};
export default VisualizeSchemaResolver;
