<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\carbrand;
use App\Models\car;
use Illuminate\Pagination\Paginator;
Paginator::useBootstrap();
use App\Http\Resources\carbrand as CarbrandResource;
use App\Http\Resources\car as CarResources;
use App\Models\favorite;
use App\Models\feedback;
use App\Models\User;
use DB;

//// -------------------------------------------------------------------file này dùng để test các chức năng có hoạt động ổn định không -------------
class aadmin extends Controller
{
    public function dashboardadmin()
    {
        $car = car::orderBy('car_id', 'desc')->paginate(10);
        $brands = carbrand::all();
        $data1 = CarResources::collection($car);
        $data2 = CarbrandResource::collection($brands);
        return response()->json([$data1, $data2]);
        // return view('admin.dashboard', ['car' => $car, 'brands' => $brands]);
    }
    public function editcaradmin($id)
    {
        $car = car::findOrFail($id);
        $brands = carbrand::all();
        return view('admin.editCar', ['car' => $car, 'brands' => $brands]);
    }
    public function admincar()
    {
        $car = car::orderBy('car_id', 'desc')->paginate(10);
        $brands = carbrand::all();
        return view('admin.cars', ['car' => $car, 'brands' => $brands]);
    }
    public function create()
    {
        // Lấy danh sách các thương hiệu xe để hiển thị trong form
        $brands = carbrand::all();
        $data = CarbrandResource::collection($brands);
        return response()->json($data);
        // return view('create', compact('brands'));
        ;
    }
    public function store(Request $request)
    {
        // Validate dữ liệu từ form
        $validated = $request->validate([
            'car_name' => 'required|string|max:255',
            'seats' => 'required|integer',
            'model' => 'required|integer',
            'license_plate' => 'required|string|max:255',
            'rental_price' => 'required|numeric',
            'car_status' => 'required|boolean',
            'mileage' => 'required|numeric',
            'car_description' => 'nullable|string',
            'brandid' => 'required|exists:carbrand,brand_id',
            'car_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Thêm quy tắc cho ảnh
        ]);

        if ($request->hasFile('car_image')) {
            $image = $request->file('car_image');
            $imageName = $image->getClientOriginalName();
            $image->storeAs('public/img', $imageName);
            $validated['car_image'] = $imageName;
        }
        // Lưu thông tin xe vào cơ sở dữ liệu
        $carr = car::create($validated);
        // $data = new CarbrandResource($carr);
        return redirect('/admincar')->with('success', 'Car added successfully!');
    }
    public function updateCar(Request $request, $id)
    {
        // Validate dữ liệu từ form
        $request->validate([
            'car_name' => 'required|string|max:255',
            'seats' => 'required|integer',
            'model' => 'required|integer',
            'license_plate' => 'required|string|max:255',
            'rental_price' => 'required|numeric',
            'car_status' => 'required|boolean',
            'mileage' => 'required|numeric',
            'car_description' => 'nullable|string',
            'brandid' => 'required|exists:carbrand,brand_id',
            'car_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $car = car::find($id);
        if (!$car) {
            return response()->json(['message' => 'Car không tồn tại'], 404);
        }

        // Cập nhật chi tiết xe
        $car->car_name = $request->input('car_name');
        $car->seats = $request->input('seats');
        $car->model = $request->input('model');
        $car->license_plate = $request->input('license_plate');
        $car->rental_price = $request->input('rental_price');
        $car->car_status = $request->input('car_status');
        $car->mileage = $request->input('mileage');
        $car->car_description = $request->input('car_description');
        $car->brandid = $request->input('brandid');

        // Xử lý ảnh xe
        if ($request->hasFile('car_image')) {
            $image = $request->file('car_image');
            $imageName = $image->getClientOriginalName();
            $image->storeAs('public/img', $imageName);
            $car->car_image = $imageName; // Lưu tên file vào database
        }
        $car->save();
        return redirect('/admincar')->with('success', 'Car added successfully!');
    }
    public function editCar($id)
    {
        //Truy xuất đúng xe cần edit
        $car = car::find($id);

        //Nếu xe không tìm theeys thì xuất ra car không tồn tại
        if (!$car) {
            return redirect()->back()->withErrors('Car không tồn tại');
        }

        //Lấy tất cả các brand 
        $brands = carbrand::all();
        return view('edit', compact('car', 'brands'));
    }
    public function deleteCar($id)
    {
        $car = car::find($id);

        if (!$car) {
            return redirect()->back()->withErrors('Car không tồn tại');
        }

        $car->delete();

        return redirect('/admincar')->with('success', 'Xóa xe thành công');
    }

    public function getFeedbacks()
    {
        // Lấy dữ liệu từ bảng feedback cùng với user và car
        $feedbacks = DB::table('feedback')
            ->join('user', 'feedback.user_id', '=', 'user.user_id')
            ->join('car', 'feedback.car_id', '=', 'car.car_id')
            ->select(
                'feedback.feedback_id',
                'feedback.content',
                'feedback.rating',
                'feedback.feedback_date',
                'user.user_id',
                'user.name as user_name',
                'car.car_id',
                'car.car_name as car_name'
            )
            ->orderBy('feedback.feedback_date', 'desc')
            ->paginate(10); // Phân trang feedbacks

        return view('admin.feedbacks', ['feedbacks' => $feedbacks]);
    }
    public function getFavorites()
    {
        // Lấy dữ liệu từ bảng favorite cùng với user và car
        $favorites = DB::table('favorite')
            ->join('user', 'favorite.user_id', '=', 'user.user_id')
            ->join('car', 'favorite.car_id', '=', 'car.car_id')
            ->select(
                'favorite.favorite_id',
                'favorite.date_favorite',
                'user.user_id',
                'user.name as user_name',
                'car.car_id',
                'car.car_name as car_name'
            )
            ->orderBy('favorite.date_favorite', 'desc')
            ->paginate(10); // Phân trang favorites

        return view('admin.favorites', ['favorites' => $favorites]);
    }
    //delete favorite
    public function deleteFavorite($id)
    {
        favorite::where('favorite_id', $id)->delete();
        return redirect()->back()->with('success', 'Favorite đã được xóa thành công.');
    }


    //feedback
    public function getFeedbackId()
    {
        $users = User::all(); // Lấy danh sách người dùng
        $cars = Car::all(); // Lấy danh sách xe
        return view('admin.addfeedback', compact('users', 'cars'));
    }
    // Xóa phản hồi
    public function deleteFeedback($id)
    {
        $feedback = feedback::findOrFail($id);
        $feedback->delete();
        return redirect()->route('admin.feedbacks')->with('success', 'Phản hồi đã được xóa thành công.');
    }
}
