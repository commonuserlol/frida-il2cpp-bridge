# Test coverage

|       Unity version       | Metadata version | Status |
| :-----------------------: | :--------------: | :----: |
|     [5.3.5](5.3.5f1/)     |        21        |   ✔    |
| [2017.4.40](2017.4.40f1/) |        24        |   ✔    |
|  [2018.3.0](2018.3.0f2/)  |       24.1       |   ✔    |
|  [2019.3.0](2019.3.0f6/)  |       24.2       |   ✔    |
| [2019.4.14](2019.4.14f1/) |       24.3       |   ✔    |
| [2019.4.20](2019.4.20f1/) |       24.4       |   ✔    |
| [2019.4.40](2019.4.40f1/) |       24.5       |   ✔    |
| [2020.1.10](2020.1.10f1/) |       24.3       |   ✔    |
| [2020.1.17](2020.1.17f1/) |       24.4       |   ✔    |
|  [2020.2.3](2020.2.3f1/)  |        27        |   ✔    |
|  [2020.2.4](2020.2.4f1/)  |       27.1       |   ✔    |
|  [2021.1.0](2021.1.0f1/)  |       27.2       |   ✔    |
|  [2021.2.0](2021.2.0f1/)  |        29        |   ✖    |
|  [2023.1.0](2023.1.0f1/)  |       29.1       |   ✔    |
| [6000.0.10](6000.0.10f1/) |        31        |   ✔    |

**NOTE**: `16`, `19`, `20`, `22` and `23` metadata versions are untested because they don't have linux installer

**NOTE**: For `2021.2.0 ~ <2023` build is broken due uknown reason (probably because their new burst compiler, see [2021.1.0b16 release notes](https://unity.com/en/releases/editor/beta/2021.2.0b16#notes), however b15 is broken too). If you still want to test v29 (or 29.1 & 31 which were replaced by working versions) do `pkill bee_backend -9` after build finished (use any process monitor, like `btop`)
