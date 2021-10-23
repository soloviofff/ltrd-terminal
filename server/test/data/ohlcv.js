
var ohlcv = [ [ 1575203400000, 7335.4, 7368.27, 7334.53, 7365, 524.116207 ],
  [ 1575204300000, 7364.74, 7378.07, 7352.58, 7352.79, 392.27885 ],
  [ 1575205200000, 7353.93, 7418.42, 7352.82, 7402.02, 864.108954 ],
  [ 1575206100000, 7402.98, 7417, 7385.85, 7389.79, 466.42941 ],
  [ 1575207000000, 7391.76, 7443.61, 7380.85, 7436.82, 1040.509843 ],
  [ 1575207900000, 7436.47, 7474.91, 7431.46, 7440.06, 1327.21048 ],
  [ 1575208800000, 7440.38, 7477.29, 7415.39, 7431.48, 991.862489 ],
  [ 1575209700000, 7431.07, 7449.41, 7411.27, 7428.83, 643.217886 ],
  [ 1575210600000, 7427.77, 7434.96, 7402, 7423.21, 573.744249 ],
  [ 1575211500000, 7423.31, 7434.5, 7385.1, 7391.62, 638.877443 ],
  [ 1575212400000, 7391.57, 7410.91, 7350, 7359.42, 874.376816 ],
  [ 1575213300000, 7359.55, 7373.84, 7333.33, 7355.81, 929.735207 ],
  [ 1575214200000, 7356.98, 7364.54, 7267.52, 7309.28, 1188.900631 ],
  [ 1575215100000, 7308.44, 7325, 7281.03, 7306.22, 594.348519 ],
  [ 1575216000000, 7306.21, 7340, 7275.24, 7322.03, 918.812898 ],
  [ 1575216900000, 7322.72, 7348.22, 7308.62, 7319.97, 518.888231 ],
  [ 1575217800000, 7318.62, 7325.34, 7296.14, 7319.97, 448.560644 ],
  [ 1575218700000, 7322.53, 7335.95, 7313, 7324.78, 415.748055 ],
  [ 1575219600000, 7325.05, 7337.96, 7290.24, 7302.24, 474.643025 ],
  [ 1575220500000, 7301.61, 7319.99, 7298.48, 7310.35, 385.847682 ],
  [ 1575221400000, 7310.84, 7325.23, 7305, 7307.92, 200.816804 ],
  [ 1575222300000, 7307.26, 7325, 7301, 7323.22, 270.693745 ],
  [ 1575223200000, 7323.22, 7332.59, 7301.04, 7317.97, 304.12844 ],
  [ 1575224100000, 7317.53, 7326.75, 7304.41, 7325.55, 184.494203 ],
  [ 1575225000000, 7325.58, 7326.47, 7295, 7307.31, 273.657155 ],
  [ 1575225900000, 7307.32, 7324.9, 7300, 7309.08, 243.390382 ],
  [ 1575226800000, 7309.83, 7309.83, 7280, 7289.19, 386.419464 ],
  [ 1575227700000, 7288.23, 7302.5, 7283.25, 7284.36, 227.257814 ],
  [ 1575228600000, 7284.34, 7310.47, 7282.4, 7299.11, 347.340529 ],
  [ 1575229500000, 7300.49, 7362.48, 7296.63, 7358.39, 677.777136 ],
  [ 1575230400000, 7355.83, 7372.75, 7340.16, 7360.13, 572.215746 ],
  [ 1575231300000, 7360.36, 7383, 7353.84, 7378.98, 418.290999 ],
  [ 1575232200000, 7379, 7379.26, 7357.51, 7358.35, 388.341404 ],
  [ 1575233100000, 7358.94, 7369.98, 7349.69, 7350.9, 234.961644 ],
  [ 1575234000000, 7350.37, 7351.45, 7306.18, 7312.64, 830.056913 ],
  [ 1575234900000, 7311.96, 7354.19, 7308.73, 7340, 529.443972 ],
  [ 1575235800000, 7338.89, 7380, 7336.02, 7368.4, 497.064896 ],
  [ 1575236700000, 7368.46, 7380, 7345.92, 7366.66, 263.801302 ],
  [ 1575237600000, 7366.75, 7414.27, 7329.89, 7352.26, 1000.722502 ],
  [ 1575238500000, 7352.43, 7376.98, 7342.81, 7347, 362.919637 ],
  [ 1575239400000, 7347, 7398.7, 7333.92, 7390.67, 318.592904 ],
  [ 1575240300000, 7391.31, 7394.82, 7365, 7379.99, 278.829162 ],
  [ 1575241200000, 7380, 7408, 7378, 7400.19, 309.876133 ],
  [ 1575242100000, 7401.28, 7436.81, 7395.01, 7416.81, 672.164259 ],
  [ 1575243000000, 7416.83, 7429.27, 7390, 7401.33, 472.910929 ],
  [ 1575243900000, 7402.05, 7412.32, 7387.18, 7390.89, 276.64942 ],
  [ 1575244800000, 7391.5, 7411, 7388.5, 7400, 300.773618 ],
  [ 1575245700000, 7399.63, 7402.19, 7357.24, 7370.67, 475.13863 ],
  [ 1575246600000, 7370.67, 7393.94, 7361.08, 7365.48, 372.007911 ],
  [ 1575247500000, 7365.82, 7374.9, 7347.21, 7367.44, 442.724463 ],
  [ 1575248400000, 7369.16, 7381.1, 7361.56, 7364.08, 336.727249 ],
  [ 1575249300000, 7363.79, 7366.64, 7352.67, 7365.07, 221.548467 ],
  [ 1575250200000, 7365.02, 7399.3, 7363.08, 7393.89, 289.342123 ],
  [ 1575251100000, 7394.59, 7415.14, 7392.86, 7397.17, 320.290461 ],
  [ 1575252000000, 7395.99, 7420.56, 7395.3, 7407.42, 308.329251 ],
  [ 1575252900000, 7406.56, 7407.64, 7384, 7387.57, 249.529181 ],
  [ 1575253800000, 7387.21, 7395.2, 7381.4, 7393.18, 213.333807 ],
  [ 1575254700000, 7392.78, 7413.19, 7385.5, 7398.56, 238.768429 ],
  [ 1575255600000, 7398.57, 7398.79, 7378.86, 7387.06, 216.088354 ],
  [ 1575256500000, 7387.21, 7390.7, 7360, 7369.88, 371.929735 ],
  [ 1575257400000, 7369.9, 7374.78, 7350.9, 7359.2, 508.345338 ],
  [ 1575258300000, 7359.2, 7369.46, 7352, 7358.84, 383.652562 ],
  [ 1575259200000, 7359.36, 7359.36, 7320, 7327.36, 520.637725 ],
  [ 1575260100000, 7325.34, 7343.72, 7319.12, 7338.59, 428.790554 ],
  [ 1575261000000, 7338.81, 7356.67, 7326.53, 7333.7, 318.698237 ],
  [ 1575261900000, 7334.8, 7375.25, 7327.73, 7372.97, 381.944097 ],
  [ 1575262800000, 7373.07, 7374.77, 7332.49, 7336.69, 372.538778 ],
  [ 1575263700000, 7336.48, 7336.48, 7301, 7311.88, 526.683422 ],
  [ 1575264600000, 7309.98, 7309.98, 7251.9, 7274.86, 1293.091997 ],
  [ 1575265500000, 7274.65, 7293.62, 7265.01, 7281.02, 409.769153 ],
  [ 1575266400000, 7281.01, 7282.22, 7151.1, 7206.5, 2571.2224 ],
  [ 1575267300000, 7206.52, 7232.33, 7181.5, 7205.53, 1015.660046 ],
  [ 1575268200000, 7205.45, 7250, 7205, 7240.37, 797.091517 ],
  [ 1575269100000, 7240.07, 7257.86, 7221.52, 7254.55, 561.243451 ],
  [ 1575270000000, 7254.55, 7271.97, 7229, 7230.84, 669.089837 ],
  [ 1575270900000, 7230.37, 7249, 7222.65, 7233.47, 494.983466 ],
  [ 1575271800000, 7233.93, 7246.14, 7222.55, 7245, 441.854793 ],
  [ 1575272700000, 7245.09, 7255.97, 7232.19, 7252.96, 344.142632 ],
  [ 1575273600000, 7252.96, 7254.63, 7213.42, 7224, 660.827926 ],
  [ 1575274500000, 7224.76, 7234.57, 7203.56, 7221.3, 419.732786 ],
  [ 1575275400000, 7220.94, 7221.72, 7181.01, 7212.16, 757.872378 ],
  [ 1575276300000, 7212.16, 7248.16, 7207.11, 7224.16, 566.031948 ],
  [ 1575277200000, 7224.49, 7247.36, 7218.38, 7234.96, 352.865819 ],
  [ 1575278100000, 7234.94, 7295, 7234.26, 7270.17, 1132.530824 ],
  [ 1575279000000, 7270.39, 7338, 7269.47, 7320.69, 1068.909918 ],
  [ 1575279900000, 7321.08, 7321.08, 7291.55, 7298.24, 535.974804 ],
  [ 1575280800000, 7297.08, 7334.64, 7290.28, 7313.56, 646.618023 ],
  [ 1575281700000, 7312.84, 7369, 7311, 7341.5, 1044.883951 ],
  [ 1575282600000, 7341.33, 7341.98, 7307.99, 7328.71, 645.947888 ],
  [ 1575283500000, 7329.51, 7331.99, 7261.57, 7288.99, 976.132453 ],
  [ 1575284400000, 7290.83, 7297.91, 7269.69, 7296.77, 400.794374 ],
  [ 1575285300000, 7296.77, 7318.99, 7276.94, 7289.73, 397.451481 ],
  [ 1575286200000, 7289.73, 7301.99, 7267.42, 7270.13, 357.203387 ],
  [ 1575287100000, 7270.64, 7300, 7270.14, 7297.91, 285.814689 ],
  [ 1575288000000, 7297.91, 7299.05, 7236.56, 7250.16, 620.058165 ],
  [ 1575288900000, 7250.37, 7270.72, 7236.67, 7260.26, 402.792994 ],
  [ 1575289800000, 7260.06, 7319.72, 7251.68, 7309.92, 687.662482 ],
  [ 1575290700000, 7308.79, 7330, 7290.05, 7309.54, 497.290726 ],
  [ 1575291600000, 7308.88, 7314.99, 7283, 7295.5, 372.407577 ],
  [ 1575292500000, 7294.74, 7312.54, 7289.72, 7309.84, 429.392647 ]
]

exports.ohlcv = ohlcv
