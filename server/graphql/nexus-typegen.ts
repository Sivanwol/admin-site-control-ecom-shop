import { core } from 'nexus'

declare global {
    interface NexusGenCustomInputMethods<TypeName extends string> {
        dateTime<FieldName extends string>(
            fieldName: FieldName,
            // @ts-ignore
            opts?: core.ScalarInputFieldConfig<
                core.GetGen3<'inputTypes', TypeName, FieldName>
            >
        ): void // "DateTime";
    }
}
declare global {
    interface NexusGenCustomOutputMethods<TypeName extends string> {
        dateTime<FieldName extends string>(
            fieldName: FieldName,
            ...opts: core.ScalarOutSpread<TypeName, FieldName>
        ): void // "DateTime";
    }
}

declare global {
    interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {}

export interface NexusGenScalars {
    String: string
    Int: number
    Float: number
    Boolean: boolean
    ID: string
    Date: any
}

export interface NexusGenAbstractResolveReturnTypes {}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = 'Mutation' | 'Post' | 'Query' | 'User'

export type NexusGenInputNames = never

export type NexusGenEnumNames = never

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames =
    | 'Boolean'
    | 'Date'
    | 'Float'
    | 'ID'
    | 'Int'
    | 'String'

export type NexusGenUnionNames = never

export interface NexusGenTypes {
    context: any
    inputTypes: NexusGenInputs
    // rootTypes: NexusGenRootTypes
    // argTypes: NexusGenArgTypes
    // fieldTypes: NexusGenFieldTypes
    // allTypes: NexusGenAllTypes
    inheritedFields: NexusGenInheritedFields
    objectNames: NexusGenObjectNames
    inputNames: NexusGenInputNames
    enumNames: NexusGenEnumNames
    interfaceNames: NexusGenInterfaceNames
    scalarNames: NexusGenScalarNames
    unionNames: NexusGenUnionNames
    allInputTypes:
        | NexusGenTypes['inputNames']
        | NexusGenTypes['enumNames']
        | NexusGenTypes['scalarNames']
    allOutputTypes:
        | NexusGenTypes['objectNames']
        | NexusGenTypes['enumNames']
        | NexusGenTypes['unionNames']
        | NexusGenTypes['interfaceNames']
        | NexusGenTypes['scalarNames']
    allNamedTypes:
        | NexusGenTypes['allInputTypes']
        | NexusGenTypes['allOutputTypes']
    abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
    abstractResolveReturn: NexusGenAbstractResolveReturnTypes
}

declare global {
    interface NexusGenPluginTypeConfig<TypeName extends string> {}
    interface NexusGenPluginFieldConfig<
        TypeName extends string,
        FieldName extends string
    > {}
    interface NexusGenPluginSchemaConfig {}
}
