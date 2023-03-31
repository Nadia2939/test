import Image from 'next/image';

type CompanyLogoProps = {
  height: number;
  width: number;
  layout?: 'fixed' | 'responsive' | 'intrinsic' | 'fill';
  mode?: 'light' | 'dark';
  type?: 'png' | 'svg';
  markOnly?: boolean;
};

export default function CompanyLogo({
  height,
  width,
  layout = 'intrinsic',
  mode = 'light',
  type = 'png',
  markOnly = false,
}: CompanyLogoProps) {
  switch (type) {
    /* -------------------------- */
    /* Images */
    /* -------------------------- */
    case 'png':
      return markOnly ? (
        <Image
          height={height}
          width={width}
          layout={layout}
          src="/images/logos/logo_white.svg"
          alt="Company Logo"
          priority
          className={`${height} ${width}`}
        />
      ) : (
        <Image
          height={height}
          width={width}
          layout={layout}
          src="/images/logos/logo_white.svg"
          alt="Company Logo"
          priority
          className={`${height} ${width}`}
        />
      );

    /* -------------------------- */
    /* SVG */
    /* -------------------------- */
    case 'svg':
      switch (mode) {
        case 'light':
          return (
            <svg
              className={`shrink ${height} ${width}`}
              viewBox="0 0 1920 1080"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M705.1 559.475C684.092 559.475 665.35 551.593 649.348 536.065C636.966 524.021 627.832 509.237 619.002 494.961C595.862 457.511 587.168 453.383 574.075 453.383C560.983 453.383 552.289 457.477 529.149 494.961C520.319 509.237 511.185 524.021 498.803 536.065C482.801 551.593 464.059 559.475 443.05 559.475C422.042 559.475 403.299 551.593 387.298 536.065C374.916 524.021 365.782 509.237 356.952 494.961C333.812 457.511 325.117 453.383 312.025 453.383C298.933 453.383 290.238 457.477 267.098 494.961C258.269 509.237 249.134 524.021 236.752 536.065C220.751 551.593 202.009 559.475 181 559.475V511.098C194.092 511.098 202.787 507.004 225.927 469.52C234.756 455.244 243.891 440.46 256.273 428.416C272.274 412.888 291.016 405.006 312.025 405.006C333.034 405.006 351.776 412.888 367.778 428.416C380.159 440.46 389.294 455.244 398.123 469.52C421.263 506.971 429.958 511.098 443.05 511.098C456.143 511.098 464.837 507.004 487.977 469.52C496.807 455.244 505.941 440.46 518.323 428.416C534.325 412.888 553.067 405.006 574.075 405.006C595.084 405.006 613.826 412.888 629.828 428.416C642.21 440.46 651.344 455.244 660.174 469.52C683.314 506.971 692.008 511.098 705.1 511.098V559.475Z"
                fill="#1C1F1E"
              />
              <path
                d="M705.1 693.61C684.092 693.61 665.35 685.728 649.348 670.2C636.966 658.156 627.832 643.372 619.002 629.096C595.862 591.645 587.168 587.518 574.075 587.518C560.983 587.518 552.289 591.612 529.149 629.096C520.319 643.372 511.185 658.156 498.803 670.2C482.801 685.728 464.059 693.61 443.05 693.61C422.042 693.61 403.299 685.728 387.298 670.2C374.916 658.156 365.782 643.372 356.952 629.096C333.812 591.645 325.117 587.518 312.025 587.518C298.933 587.518 290.238 591.612 267.098 629.096C258.269 643.372 249.134 658.156 236.752 670.2C220.751 685.728 202.009 693.61 181 693.61V645.233C194.092 645.233 202.787 641.139 225.927 603.655C234.756 589.379 243.891 574.595 256.273 562.551C272.274 547.023 291.016 539.141 312.025 539.141C333.034 539.141 351.776 547.023 367.778 562.551C380.159 574.595 389.294 589.379 398.123 603.655C421.263 641.105 429.958 645.233 443.05 645.233C456.143 645.233 464.837 641.139 487.977 603.655C496.807 589.379 505.941 574.595 518.323 562.551C534.325 547.023 553.067 539.141 574.075 539.141C595.084 539.141 613.826 547.023 629.828 562.551C642.21 574.595 651.344 589.379 660.174 603.655C683.314 641.105 692.008 645.233 705.1 645.233V693.61Z"
                fill="#1C1F1E"
              />
              <path
                d="M938.629 380L1059.17 693.405H1000.37L970.295 610.047H846.306L815.757 693.405H758.584L879.832 380H938.629ZM955.849 568.266L908.317 437.85L860.549 568.266H955.849Z"
                fill="#1C1F1E"
              />
              <path
                d="M1069.87 536.597C1071.86 514.709 1079.03 497.659 1091.45 485.378C1108.6 468.395 1134.55 459.904 1169.29 459.904C1188.88 459.904 1206.03 462.475 1220.72 467.583C1235.4 472.726 1246.29 479.931 1253.33 489.269C1260.37 498.606 1263.88 512.848 1263.88 531.963C1263.88 536.394 1263.58 550.197 1262.97 573.303L1262.5 601.315C1262.02 616.944 1261.82 625.74 1261.82 627.736C1261.82 642.757 1262.46 651.925 1263.78 655.274C1265.07 658.657 1268.72 660.315 1274.68 660.315C1277.28 660.315 1280.97 660.078 1285.7 659.638V694.754C1272.54 698.104 1261.75 699.795 1253.33 699.795C1231.74 699.795 1219.43 690.695 1216.35 672.46C1195.68 690.83 1168.89 699.998 1135.97 699.998C1115.3 699.998 1098.32 695.093 1084.99 685.316C1068.31 673.069 1059.95 655.376 1059.95 632.27C1059.95 610.381 1067.6 593.703 1082.92 582.201C1091.35 575.942 1099.84 571.612 1108.4 569.244C1116.96 566.875 1134.72 564 1161.68 560.651C1186.04 557.606 1200.89 554.561 1206.34 551.584C1211.78 548.607 1214.49 541.841 1214.49 531.252C1214.49 508.281 1198.79 496.813 1167.43 496.813C1151.19 496.813 1139.32 499.824 1131.74 505.879C1124.16 511.935 1119.29 522.152 1117.16 536.53H1069.87V536.597ZM1213.85 580.002C1207.56 583.216 1201.74 585.482 1196.39 586.768C1191.05 588.087 1179.17 589.948 1160.8 592.384C1140.13 595.124 1126.6 599.725 1120.17 606.153C1114.05 612.276 1111 620.226 1111 630.037C1111 640.761 1114.62 649.083 1121.9 655.071C1129.17 661.025 1139.39 664.036 1152.55 664.036C1164.63 664.036 1175.89 661.804 1186.31 657.372C1196.73 652.94 1204.14 647.189 1208.57 640.152C1212.09 634.502 1213.85 623.305 1213.85 606.626V580.002Z"
                fill="#1C1F1E"
              />
              <path d="M1354.51 380V693.438H1304.47V380H1354.51Z" fill="#1C1F1E" />
              <path
                d="M1498.74 466.096V502.836H1452.83V622.46C1452.83 637.007 1454.39 646.209 1457.53 650.133C1460.68 654.024 1468.06 655.986 1479.69 655.986C1485.34 655.986 1491.7 655.445 1498.74 654.362V693.842C1486.49 695.229 1475.09 695.906 1464.54 695.906C1449.99 695.906 1438.49 694.282 1430 691.068C1421.5 687.854 1414.94 682.644 1410.37 675.439C1407.16 670.093 1405.1 663.564 1404.18 655.918C1403.27 648.273 1402.8 633.252 1402.8 610.924V502.768H1364.91V466.028H1402.8V398.131H1452.87V466.096H1498.77H1498.74Z"
                fill="#1C1F1E"
              />
              <path
                d="M1619.17 459.904C1653.14 459.904 1680.64 471 1701.62 493.193C1721.82 514.472 1731.93 543.33 1731.93 579.765C1731.93 618.501 1720.53 648.711 1697.73 670.464C1677.36 689.917 1650.67 699.626 1617.58 699.626C1580.98 699.626 1552.46 688.157 1531.92 665.187C1512.34 643.129 1502.53 614.745 1502.53 580.002C1502.53 545.258 1511.69 518.397 1530.06 497.117C1551.48 472.32 1581.18 459.904 1619.14 459.904H1619.17ZM1618.26 500.094C1597.89 500.094 1581.99 507.165 1570.49 521.34C1559.02 535.515 1553.27 555.069 1553.27 580.002C1553.27 604.935 1559.33 625.91 1571.41 639.712C1583.04 652.872 1598.57 659.469 1618.02 659.469C1635.78 659.469 1650.09 653.65 1660.95 642.013C1674.42 627.77 1681.15 606.897 1681.15 579.325C1681.15 553.918 1675.26 534.331 1663.46 520.528C1652.43 507.368 1637.34 500.568 1618.23 500.094H1618.26Z"
                fill="#1C1F1E"
              />
            </svg>
          );
        case 'dark':
          return (
            <svg
              className={`shrink ${height} ${width}`}
              viewBox="0 0 1920 1080"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M705.1 559.475C684.092 559.475 665.35 551.593 649.348 536.065C636.966 524.021 627.832 509.237 619.002 494.961C595.862 457.511 587.168 453.383 574.075 453.383C560.983 453.383 552.289 457.477 529.149 494.961C520.319 509.237 511.185 524.021 498.803 536.065C482.801 551.593 464.059 559.475 443.05 559.475C422.042 559.475 403.299 551.593 387.298 536.065C374.916 524.021 365.782 509.237 356.952 494.961C333.812 457.511 325.117 453.383 312.025 453.383C298.933 453.383 290.238 457.477 267.098 494.961C258.269 509.237 249.134 524.021 236.752 536.065C220.751 551.593 202.009 559.475 181 559.475V511.098C194.092 511.098 202.787 507.004 225.927 469.52C234.756 455.244 243.891 440.46 256.273 428.416C272.274 412.888 291.016 405.006 312.025 405.006C333.034 405.006 351.776 412.888 367.778 428.416C380.159 440.46 389.294 455.244 398.123 469.52C421.263 506.971 429.958 511.098 443.05 511.098C456.143 511.098 464.837 507.004 487.977 469.52C496.807 455.244 505.941 440.46 518.323 428.416C534.325 412.888 553.067 405.006 574.075 405.006C595.084 405.006 613.826 412.888 629.828 428.416C642.21 440.46 651.344 455.244 660.174 469.52C683.314 506.971 692.008 511.098 705.1 511.098V559.475Z"
                fill="#03E1D0"
              />
              <path
                d="M705.1 693.61C684.092 693.61 665.35 685.728 649.348 670.2C636.966 658.156 627.832 643.372 619.002 629.096C595.862 591.645 587.168 587.518 574.075 587.518C560.983 587.518 552.289 591.612 529.149 629.096C520.319 643.372 511.185 658.156 498.803 670.2C482.801 685.728 464.059 693.61 443.05 693.61C422.042 693.61 403.299 685.728 387.298 670.2C374.916 658.156 365.782 643.372 356.952 629.096C333.812 591.645 325.117 587.518 312.025 587.518C298.933 587.518 290.238 591.612 267.098 629.096C258.269 643.372 249.134 658.156 236.752 670.2C220.751 685.728 202.009 693.61 181 693.61V645.233C194.092 645.233 202.787 641.139 225.927 603.655C234.756 589.379 243.891 574.595 256.273 562.551C272.274 547.023 291.016 539.141 312.025 539.141C333.034 539.141 351.776 547.023 367.778 562.551C380.159 574.595 389.294 589.379 398.123 603.655C421.263 641.105 429.958 645.233 443.05 645.233C456.143 645.233 464.837 641.139 487.977 603.655C496.807 589.379 505.941 574.595 518.323 562.551C534.325 547.023 553.067 539.141 574.075 539.141C595.084 539.141 613.826 547.023 629.828 562.551C642.21 574.595 651.344 589.379 660.174 603.655C683.314 641.105 692.008 645.233 705.1 645.233V693.61Z"
                fill="#03E1D0"
              />
              <path
                d="M938.629 380L1059.17 693.405H1000.37L970.295 610.047H846.306L815.757 693.405H758.584L879.832 380H938.629ZM955.849 568.266L908.317 437.85L860.549 568.266H955.849Z"
                fill="white"
              />
              <path
                d="M1069.87 536.597C1071.86 514.709 1079.03 497.659 1091.45 485.378C1108.6 468.395 1134.55 459.904 1169.29 459.904C1188.88 459.904 1206.03 462.475 1220.72 467.583C1235.4 472.726 1246.29 479.931 1253.33 489.269C1260.37 498.606 1263.88 512.848 1263.88 531.963C1263.88 536.394 1263.58 550.197 1262.97 573.303L1262.5 601.315C1262.02 616.944 1261.82 625.74 1261.82 627.736C1261.82 642.757 1262.46 651.925 1263.78 655.274C1265.07 658.657 1268.72 660.315 1274.68 660.315C1277.28 660.315 1280.97 660.078 1285.7 659.638V694.754C1272.54 698.104 1261.75 699.795 1253.33 699.795C1231.74 699.795 1219.43 690.695 1216.35 672.46C1195.68 690.83 1168.89 699.998 1135.97 699.998C1115.3 699.998 1098.32 695.093 1084.99 685.316C1068.31 673.069 1059.95 655.376 1059.95 632.27C1059.95 610.381 1067.6 593.703 1082.92 582.201C1091.35 575.942 1099.84 571.612 1108.4 569.244C1116.96 566.875 1134.72 564 1161.68 560.651C1186.04 557.606 1200.89 554.561 1206.34 551.584C1211.78 548.607 1214.49 541.841 1214.49 531.252C1214.49 508.281 1198.79 496.813 1167.43 496.813C1151.19 496.813 1139.32 499.824 1131.74 505.879C1124.16 511.935 1119.29 522.152 1117.16 536.53H1069.87V536.597ZM1213.85 580.002C1207.56 583.216 1201.74 585.482 1196.39 586.768C1191.05 588.087 1179.17 589.948 1160.8 592.384C1140.13 595.124 1126.6 599.725 1120.17 606.153C1114.05 612.276 1111 620.226 1111 630.037C1111 640.761 1114.62 649.083 1121.9 655.071C1129.17 661.025 1139.39 664.036 1152.55 664.036C1164.63 664.036 1175.89 661.804 1186.31 657.372C1196.73 652.94 1204.14 647.189 1208.57 640.152C1212.09 634.502 1213.85 623.305 1213.85 606.626V580.002Z"
                fill="white"
              />
              <path d="M1354.51 380V693.438H1304.47V380H1354.51Z" fill="white" />
              <path
                d="M1498.74 466.096V502.836H1452.83V622.46C1452.83 637.007 1454.39 646.209 1457.53 650.133C1460.68 654.024 1468.06 655.986 1479.69 655.986C1485.34 655.986 1491.7 655.445 1498.74 654.362V693.842C1486.49 695.229 1475.09 695.906 1464.54 695.906C1449.99 695.906 1438.49 694.282 1430 691.068C1421.5 687.854 1414.94 682.644 1410.37 675.439C1407.16 670.093 1405.1 663.564 1404.18 655.918C1403.27 648.273 1402.8 633.252 1402.8 610.924V502.768H1364.91V466.028H1402.8V398.131H1452.87V466.096H1498.77H1498.74Z"
                fill="white"
              />
              <path
                d="M1619.17 459.904C1653.14 459.904 1680.64 471 1701.62 493.193C1721.82 514.472 1731.93 543.33 1731.93 579.765C1731.93 618.501 1720.53 648.711 1697.73 670.464C1677.36 689.917 1650.67 699.626 1617.58 699.626C1580.98 699.626 1552.46 688.157 1531.92 665.187C1512.34 643.129 1502.53 614.745 1502.53 580.002C1502.53 545.258 1511.69 518.397 1530.06 497.117C1551.48 472.32 1581.18 459.904 1619.14 459.904H1619.17ZM1618.26 500.094C1597.89 500.094 1581.99 507.165 1570.49 521.34C1559.02 535.515 1553.27 555.069 1553.27 580.002C1553.27 604.935 1559.33 625.91 1571.41 639.712C1583.04 652.872 1598.57 659.469 1618.02 659.469C1635.78 659.469 1650.09 653.65 1660.95 642.013C1674.42 627.77 1681.15 606.897 1681.15 579.325C1681.15 553.918 1675.26 534.331 1663.46 520.528C1652.43 507.368 1637.34 500.568 1618.23 500.094H1618.26Z"
                fill="white"
              />
            </svg>
          );
      }
  }
}