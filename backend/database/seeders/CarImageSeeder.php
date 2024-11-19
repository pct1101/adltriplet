<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class CarImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy danh sách các car_id hợp lệ từ bảng car
        $carIds = DB::table('car')->pluck('car_id')->toArray();

        DB::table('car_image')->insert([
            [
                'carImage_url' => '3tIu1DFoRwMNmyMkK6SUhw.jpg',
                'car_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'tYRtd52RxCWZL1E8p6gCJQ.jpg',
                'car_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'oahAMHDnCofB7eGEuHquZw.jpg',
                'car_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '0tAH0_3fUAO66aLhkxY-g.jpg',
                'car_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'Ar-I59DebLLYrO7t6xGTOA.jpg',
                'car_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'm9o_9QsChZmAZkhDl3xPjw.jpg',
                'car_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'wg8T-j72q0pO9EHElVPrvw.jpg',
                'car_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'QlxqmWxVtWrQd4HlLMXZOA.jpg',
                'car_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ZuIwrD7YDkdC03Jcj6KQvg.jpg',
                'car_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'WyfRAz15rkXe4_uB6qlTIw.jpg',
                'car_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'JooX0ddNMlJTAa3PUGcduw.jpg',
                'car_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'J6uXBRQnXBiAqOjdAHuZ4w.jpg',
                'car_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '81Qew9f3hxdbcpJPCWn_7A.jpg',
                'car_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '-BQWxfuwZA3riL792kKaCg.jpg',
                'car_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'CiWWUNDs3rNe8UR_qoMJBw.jpg',
                'car_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'fc1xQOlK6hHkQYSVrCnJog.jpg',
                'car_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'csBKK4zALAh4OAnTkEUjeg.jpg',
                'car_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ngkg8b6for_mQdh_uQeb_w.jpg',
                'car_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '_Isrsi7kDI4LrefKUo5q-A.jpg',
                'car_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'TJqXeY5ZDBMRd1xL_JlYAw.jpg',
                'car_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'WNJnSM6aA1krTRmWnOumhw.jpg',
                'car_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '0EBUD7inco72rGPx9WCmwA.jpg',
                'car_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '0jfBXU-O3o02mYIadI-O_A.jpg',
                'car_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'OMELPrmfIKjQ_cwqK8LZ0g.jpg',
                'car_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'SwnXYd4l7e0iB3oEtmqu_g.jpg',
                'car_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'JwljbftRbS-xAXDe9RZZ9Q.jpg',
                'car_id' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'v6RHlDHOb0FVkxRZNP6fVA.jpg',
                'car_id' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'pNOZ6Ax6hDwBJaADWEgj2A.jpg',
                'car_id' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'abTESNx4j2TnaptkOOZ9pw.jpg',
                'car_id' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'BQy7S-sozhOL76pkcEJ7WA.jpg',
                'car_id' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '4Rb2IicKLJMzm2LdhYA-3w.jpg',
                'car_id' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '1fmcJvUSemIDjLYd3KopqQ.jpg',
                'car_id' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ELDrLoXDNnNvlKW-6CUcmw.jpg',
                'car_id' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'aIUxGcRezESqOhVGsq9LVA.jpg',
                'car_id' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'dcLFPsfJXEvz_KvteTMDmw.jpg',
                'car_id' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'a0jRgN8VAACXvIgTB2m9HQ.jpg',
                'car_id' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'snt33YAh8_uQIj9UuosMvg.jpg',
                'car_id' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'zeBFuabKNOUsyHqB-CU9Dg.jpg',
                'car_id' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'jI8bAh8nWk9ioXF-u9zleA.jpg',
                'car_id' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '_C0wm8d_VsUa2OIaqjNbJw.jpg',
                'car_id' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'gIYJbdOJykeSmVNPQ65tPw.jpg',
                'car_id' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'EavvoNS5LcD_F_GK_UprIA.jpg',
                'car_id' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'REEpB-e0wfc1ChiszodwvA.jpg',
                'car_id' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'pCU0PXI_B6_xSCFfIt-QVQ.jpg',
                'car_id' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'DqprpBem5u5guPbB_tuCog.jpg',
                'car_id' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'NoPslaQETBoKJrnuzeOiAg.jpg',
                'car_id' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'hDldVBzjZU66CqROXDFX8Q.jpg',
                'car_id' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '_kklGqtGYoWES-LSaLNkzw.jpg',
                'car_id' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'QJZDzi-aiyKluuqfMsS48Q.jpg',
                'car_id' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'xUzBD3eCCE7ufQeSkWwl2w.jpg',
                'car_id' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'NMsPZg726JBQvMgiM6EF2A.jpg',
                'car_id' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'NMsPZg726JBQvMgiM6EF2A.jpg',
                'car_id' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'O_EWsuY1pcOR73aA3rt_SA.jpg',
                'car_id' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'p8u3JVcsQEYbp9wKg1wKkQ.jpg',
                'car_id' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'xzpU0N5I6uahkcPXjETYvw.jpg',
                'car_id' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'xzpU0N5I6uahkcPXjETYvw.jpg',
                'car_id' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'xj_cWqJo3gRbO-85a3KUsw.jpg',
                'car_id' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'EipT348bskNUhowPMI0OQw.jpg',
                'car_id' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'h8k7u0Q4ncKD3f-86wPplw.jpg',
                'car_id' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'kagyJQzbWiV6JEtnnMTWug.jpg',
                'car_id' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '8PJQaE9NwiYn-UGFeZLIpw.jpg',
                'car_id' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'Of5ONlnv_nhvU2tdUO-GIg.jpg',
                'car_id' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'gsNd4f3PW2S_d_KLR-l0Rw.jpg',
                'car_id' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'btWqSX5B-n24a4HEfcxr1A.jpg',
                'car_id' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'onMifQH2aF4epcC8RavyRQ.jpg',
                'car_id' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'NNmRD4obkEwlDHFazurb0g.jpg',
                'car_id' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'fgSVi9ukfOboxAD_NEQNGw.jpg',
                'car_id' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'fBllADQHagDrkiBeMcPt4Q.jpg',
                'car_id' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '-h5E1i4T3vdQkeppDlQIVg.jpg',
                'car_id' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '-h5E1i4T3vdQkeppDlQIVg (1).jpg',
                'car_id' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'cbE4L20kQu2XJnqBSJsENA.jpg',
                'car_id' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'P_8GD78HTG0Jzs0Mck-h5w.jpg',
                'car_id' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'qgtx6ynHyNAuh8z5UoKEYA.jpg',
                'car_id' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '76-ujG50nHfET6PZocJqrw.jpg',
                'car_id' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'vFVlV0CDMxq99qGPWOxYug.jpg',
                'car_id' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'NTyXYbOYXaZDxr_i8iRbvA.jpg',
                'car_id' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'y_GNQHhxkOrqDpGMEgzQ6g.jpg',
                'car_id' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'jAtRsOJuY_jUQ6Qvdb-62A.jpg',
                'car_id' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ZVQ8-2kSNRqHVPJEvlXExw.jpg',
                'car_id' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ha-PL2V8GP2Q5XssyPGf_A.jpg',
                'car_id' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ftg1OR-NsMkWwmRsG7A1ZQ.jpg',
                'car_id' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ftg1OR-NsMkWwmRsG7A1ZQ.jpg',
                'car_id' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'ftg1OR-NsMkWwmRsG7A1ZQ.jpg',
                'car_id' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'MSA7YYP7ecoOtV0JTRShEg.jpg',
                'car_id' => 21,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'vkDLy8bcd3BZXOBdZvj56w.jpg',
                'car_id' => 22,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'Ww-c4km2_j-kjfYH79PHeg.jpg',
                'car_id' => 22,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'jnBf_erxmnbSniDZCxROwQ.jpg',
                'car_id' => 22,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'kQXGqoX-wEvMRASy3Y6zOQ.jpg',
                'car_id' => 23,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'K38haMpG1L9e9rzkRWGs_A.jpg',
                'car_id' => 23,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'KcfVAeW4ulsjdvITcXdrgw.jpg',
                'car_id' => 23,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'CK1K-p8hR49mUo7Ukfjayg.jpg',
                'car_id' => 24,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => '53fGhTorxiYVg-9Fu0KbCQ.jpg',
                'car_id' => 24,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'carImage_url' => 'xRg7D7jEkUMej-Y8moCW5A.jpg',
                'car_id' => 24,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
