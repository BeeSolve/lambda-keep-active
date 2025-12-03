# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### LambdaKeepActive <a name="LambdaKeepActive" id="@beesolve/lambda-keep-active.LambdaKeepActive"></a>

#### Initializers <a name="Initializers" id="@beesolve/lambda-keep-active.LambdaKeepActive.Initializer"></a>

```typescript
import { LambdaKeepActive } from '@beesolve/lambda-keep-active'

new LambdaKeepActive(scope: Construct, id: string, props?: LambdaKeepActiveProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActive.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActive.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActive.Initializer.parameter.props">props</a></code> | <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActiveProps">LambdaKeepActiveProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@beesolve/lambda-keep-active.LambdaKeepActive.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@beesolve/lambda-keep-active.LambdaKeepActive.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@beesolve/lambda-keep-active.LambdaKeepActive.Initializer.parameter.props"></a>

- *Type:* <a href="#@beesolve/lambda-keep-active.LambdaKeepActiveProps">LambdaKeepActiveProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActive.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActive.keepActive">keepActive</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@beesolve/lambda-keep-active.LambdaKeepActive.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `keepActive` <a name="keepActive" id="@beesolve/lambda-keep-active.LambdaKeepActive.keepActive"></a>

```typescript
public keepActive(lambda: IFunction): void
```

###### `lambda`<sup>Required</sup> <a name="lambda" id="@beesolve/lambda-keep-active.LambdaKeepActive.keepActive.parameter.lambda"></a>

- *Type:* aws-cdk-lib.aws_lambda.IFunction

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActive.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@beesolve/lambda-keep-active.LambdaKeepActive.isConstruct"></a>

```typescript
import { LambdaKeepActive } from '@beesolve/lambda-keep-active'

LambdaKeepActive.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@beesolve/lambda-keep-active.LambdaKeepActive.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActive.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@beesolve/lambda-keep-active.LambdaKeepActive.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### LambdaKeepActiveProps <a name="LambdaKeepActiveProps" id="@beesolve/lambda-keep-active.LambdaKeepActiveProps"></a>

#### Initializer <a name="Initializer" id="@beesolve/lambda-keep-active.LambdaKeepActiveProps.Initializer"></a>

```typescript
import { LambdaKeepActiveProps } from '@beesolve/lambda-keep-active'

const lambdaKeepActiveProps: LambdaKeepActiveProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@beesolve/lambda-keep-active.LambdaKeepActiveProps.property.enableLogs">enableLogs</a></code> | <code>boolean</code> | If disabled no logs are logged to CloudWatch. |

---

##### `enableLogs`<sup>Optional</sup> <a name="enableLogs" id="@beesolve/lambda-keep-active.LambdaKeepActiveProps.property.enableLogs"></a>

```typescript
public readonly enableLogs: boolean;
```

- *Type:* boolean
- *Default:* true

If disabled no logs are logged to CloudWatch.

---



