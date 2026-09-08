const androidPrograms = [
  {
    id: 13,
    number: "01",
    title: "GUI Components — Font & Color",
    category: "ANDROID",
    shortDescription: "Change TextView font size and text color using button clicks.",
    aim: "To develop an Android application that changes the font size and text colour of a TextView using buttons.",
    algorithm: [
      "Start the application and load the main activity layout.",
      "Create a TextView and two Buttons for changing font size and color.",
      "Initialize the TextView with default font size and color.",
      "Define arrays for selectable font sizes and color values.",
      "Attach a click listener to the Change Font button to cycle font sizes.",
      "Attach a click listener to the Change Color button to cycle text colors.",
      "Display updated TextView properties on screen.",
      "Stop the application."
    ],
    code: `// MainActivity.java
package com.example.program;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private TextView textView;
    private Button buttonFont, buttonColor;
    private int fontClickCount = 0;
    private int colorClickCount = 0;

    private final float defaultFontSize = 24f;
    private final int defaultColor = Color.BLACK;

    private final int[] colors = { Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW };
    private final float[] fontSizes = { 20f, 25f, 30f, 35f, 40f };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = findViewById(R.id.textView);
        buttonFont = findViewById(R.id.buttonFont);
        buttonColor = findViewById(R.id.buttonColor);

        textView.setTextSize(defaultFontSize);
        textView.setTextColor(defaultColor);

        buttonFont.setOnClickListener(v -> {
            fontClickCount++;
            int index = fontClickCount % fontSizes.length;
            textView.setTextSize(fontSizes[index]);
        });

        buttonColor.setOnClickListener(v -> {
            colorClickCount++;
            int index = colorClickCount % colors.length;
            textView.setTextColor(colors[index]);
        });
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="16dp">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Welcome to NGP"
        android:textColor="@android:color/black"
        android:textSize="24sp"
        android:layout_marginBottom="24dp" />

    <Button
        android:id="@+id/buttonFont"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Change Font"
        android:layout_marginBottom="10dp" />

    <Button
        android:id="@+id/buttonColor"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Change Colour" />

</LinearLayout>`,
    output: `Welcome to NGP\n\n[Change Font]  [Change Colour]`,
    howItWorks: [
      "The TextView holds the default text 'Welcome to NGP'.",
      "Clicking 'Change Font' increments a counter and applies the next font size using modulo arithmetic.",
      "Clicking 'Change Colour' cycles through predefined Android Color values."
    ],
    examTips: [
      "Remember that fontSizes array uses float values (e.g., 20f, 25f).",
      "Use modulo (%) operator to avoid IndexOutOfBoundsException when cycling array items.",
      "Ensure XML IDs in activity_main.xml match the IDs used in findViewById()."
    ]
  },
  {
    id: 14,
    number: "02",
    title: "Layout Manager — Student Form",
    category: "ANDROID",
    shortDescription: "Accept student details using UI controls and display them.",
    aim: "To develop an Android application using a layout manager to accept student details and display them.",
    algorithm: [
      "Start the application and load the student detail form.",
      "Create input fields for student name and registration number.",
      "Create a Spinner to allow selecting a department.",
      "Populate department items in the Spinner using an ArrayAdapter.",
      "Create a Submit button for processing user inputs.",
      "When Submit is clicked, read name, reg number, and department.",
      "Construct a dynamic layout to display collected student information.",
      "Display the name, registration number, and department on screen.",
      "Stop the application."
    ],
    code: `// MainActivity.java
package com.example.pro2;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.view.Gravity;
import android.graphics.Typeface;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private EditText editTextName, editTextRegNo;
    private Spinner spinnerDept;
    private Button buttonSubmit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editTextName = findViewById(R.id.editTextName);
        editTextRegNo = findViewById(R.id.editTextRegNo);
        spinnerDept = findViewById(R.id.spinnerDept);
        buttonSubmit = findViewById(R.id.buttonSubmit);

        String[] departments = {"CS", "IT", "AIML"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, departments);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerDept.setAdapter(adapter);

        buttonSubmit.setOnClickListener(view -> showDetailsScreen(
            editTextName.getText().toString().trim(),
            editTextRegNo.getText().toString().trim(),
            spinnerDept.getSelectedItem().toString()
        ));
    }

    private void showDetailsScreen(String name, String regNo, String dept) {
        LinearLayout detailLayout = new LinearLayout(this);
        detailLayout.setOrientation(LinearLayout.VERTICAL);
        detailLayout.setPadding(50, 100, 50, 50);
        detailLayout.setGravity(Gravity.CENTER_HORIZONTAL);

        TextView textViewName = new TextView(this);
        textViewName.setText("Name: " + name);
        textViewName.setTextSize(22);
        textViewName.setTypeface(null, Typeface.BOLD);

        TextView textViewRegNo = new TextView(this);
        textViewRegNo.setText("Reg No: " + regNo);
        textViewRegNo.setTextSize(22);
        textViewRegNo.setTypeface(null, Typeface.BOLD);

        TextView textViewDept = new TextView(this);
        textViewDept.setText("Department: " + dept);
        textViewDept.setTextSize(22);
        textViewDept.setTypeface(null, Typeface.BOLD);

        detailLayout.addView(textViewName);
        detailLayout.addView(textViewRegNo);
        detailLayout.addView(textViewDept);

        setContentView(detailLayout);
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="24dp"
    android:gravity="center_horizontal">

    <TextView
        android:id="@+id/titleText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="STUDENT DETAIL FORM"
        android:textSize="22sp"
        android:textStyle="bold"
        android:layout_marginBottom="24dp" />

    <EditText
        android:id="@+id/editTextName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Name"
        android:textSize="18sp"
        android:layout_marginBottom="16dp" />

    <EditText
        android:id="@+id/editTextRegNo"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Reg No"
        android:textSize="18sp"
        android:layout_marginBottom="24dp" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:gravity="center_vertical"
        android:layout_marginBottom="32dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Dept: "
            android:textSize="18sp"
            android:textStyle="bold" />

        <Spinner
            android:id="@+id/spinnerDept"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    </LinearLayout>

    <Button
        android:id="@+id/buttonSubmit"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Submit" />

</LinearLayout>`,
    output: `Name: hema\nReg No: 41\nDepartment: CS`,
    howItWorks: [
      "Spinner acts as a dropdown menu populated via ArrayAdapter.",
      "Form input values are retrieved as strings on button click.",
      "A new LinearLayout is dynamically constructed and displayed using setContentView()."
    ],
    examTips: [
      "ArrayAdapter bridges array data with the Spinner UI component.",
      "Use getText().toString().trim() to extract clean string inputs."
    ]
  },
  {
    id: 15,
    number: "03",
    title: "Primitives — Draw Basic Shapes",
    category: "ANDROID",
    shortDescription: "Draw line, rectangle, and circle using Canvas and Paint.",
    aim: "To develop an Android application that draws graphical primitives such as a line, rectangle, and circle using Canvas.",
    algorithm: [
      "Start the application and load the main activity.",
      "Create a custom View for drawing graphical objects.",
      "Initialize a Paint object and enable anti-aliasing.",
      "Set required stroke width and color parameters.",
      "Override the onDraw() method of the custom View.",
      "Set Canvas background color to white.",
      "Draw a line, rectangle, and circle using Canvas drawing methods.",
      "Display all shapes on screen and stop."
    ],
    code: `// MainActivity.java
package com.example.ex3;

import android.os.Bundle;
import android.content.Context;
import android.graphics.*;
import android.view.View;
import android.widget.FrameLayout;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FrameLayout layout = findViewById(R.id.frameLayout);
        layout.addView(new DrawingView(this));
    }

    public static class DrawingView extends View {
        Paint paint;

        public DrawingView(Context context) {
            super(context);
            paint = new Paint();
            paint.setAntiAlias(true);
            paint.setStrokeWidth(8);
            paint.setTextSize(40);
        }

        @Override
        protected void onDraw(Canvas canvas) {
            super.onDraw(canvas);
            canvas.drawColor(Color.WHITE);

            // Line
            paint.setColor(Color.BLACK);
            canvas.drawLine(100, 100, 500, 100, paint);

            // Rectangle
            paint.setColor(Color.GREEN);
            canvas.drawRect(100, 150, 300, 300, paint);

            // Circle
            paint.setColor(Color.YELLOW);
            canvas.drawCircle(400, 400, 80, paint);
        }
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/frameLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`,
    output: `[Canvas Rendering: Black Line, Green Rectangle, Yellow Circle]`,
    howItWorks: [
      "DrawingView extends Android View class to draw custom graphics.",
      "onDraw(Canvas) executes graphics operations automatically on layout render.",
      "Paint object sets drawing styles such as color and stroke width."
    ],
    examTips: [
      "drawLine(startX, startY, stopX, stopY, paint).",
      "drawRect(left, top, right, bottom, paint).",
      "drawCircle(cx, cy, radius, paint)."
    ]
  },
  {
    id: 16,
    number: "04",
    title: "Database — SQLite Student Data",
    category: "ANDROID",
    shortDescription: "Insert and retrieve student records using SQLite database.",
    aim: "To develop an Android application that inserts and retrieves student data using an SQLite database.",
    algorithm: [
      "Create DatabaseHelper class extending SQLiteOpenHelper.",
      "Create student table with ID, name, and marks fields.",
      "Provide input fields for entering student name and marks.",
      "When Add Data is clicked, insert records into database table.",
      "When View Data is clicked, query database and fetch records via Cursor.",
      "Display retrieved records inside an AlertDialog.",
      "Stop the application."
    ],
    code: `// DatabaseHelper.java
package com.example.pro4;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHelper extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "student.db";
    private static final String TABLE_NAME = "students";
    private static final String COL_ID = "id";
    private static final String COL_NAME = "name";
    private static final String COL_MARKS = "marks";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE " + TABLE_NAME + " (" + COL_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " + COL_NAME + " TEXT, " + COL_MARKS + " INTEGER)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
        onCreate(db);
    }

    public boolean insertData(String name, int marks) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COL_NAME, name);
        contentValues.put(COL_MARKS, marks);
        long result = db.insert(TABLE_NAME, null, contentValues);
        return result != -1;
    }

    public Cursor getAllData() {
        SQLiteDatabase db = this.getWritableDatabase();
        return db.rawQuery("SELECT * FROM " + TABLE_NAME, null);
    }
}

// MainActivity.java
package com.example.pro4;

import androidx.appcompat.app.AppCompatActivity;
import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.widget.TextView;
import android.app.AlertDialog;
import android.graphics.Typeface;

public class MainActivity extends AppCompatActivity {
    DatabaseHelper myDb;
    EditText editName, editMarks;
    Button btnAdd, btnView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myDb = new DatabaseHelper(this);
        editName = findViewById(R.id.editName);
        editMarks = findViewById(R.id.editMarks);
        btnAdd = findViewById(R.id.btnAdd);
        btnView = findViewById(R.id.btnView);

        btnAdd.setOnClickListener(v -> {
            boolean isInserted = myDb.insertData(
                editName.getText().toString(),
                Integer.parseInt(editMarks.getText().toString())
            );
            if (isInserted) Toast.makeText(MainActivity.this, "Data Inserted", Toast.LENGTH_SHORT).show();
            else Toast.makeText(MainActivity.this, "Insert Failed", Toast.LENGTH_SHORT).show();
        });

        btnView.setOnClickListener(v -> {
            Cursor res = myDb.getAllData();
            if (res.getCount() == 0) {
                showMessage("Error", "No Data Found");
                return;
            }
            StringBuilder buffer = new StringBuilder();
            while (res.moveToNext()) {
                buffer.append("Name: ").append(res.getString(1)).append("\n");
                buffer.append("Marks: ").append(res.getString(2)).append("\n\n");
            }
            showMessage("Student Data", buffer.toString());
        });
    }

    public void showMessage(String title, String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(title);
        TextView textView = new TextView(this);
        textView.setTextSize(20);
        textView.setTypeface(null, Typeface.BOLD);
        textView.setText(message);
        textView.setPadding(40, 40, 40, 40);
        builder.setView(textView);
        builder.setCancelable(true);
        builder.show();
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <EditText
        android:id="@+id/editName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Name" />

    <EditText
        android:id="@+id/editMarks"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Marks"
        android:inputType="number" />

    <Button
        android:id="@+id/btnAdd"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Add Data" />

    <Button
        android:id="@+id/btnView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="View Data" />

</LinearLayout>`,
    output: `Student Data\n\nName: hema\nMarks: 400\n\nName: abi\nMarks: 410`,
    howItWorks: [
      "SQLiteOpenHelper creates and manages database schema lifecycle.",
      "ContentValues wraps key-value pairs for DB record insertions.",
      "Cursor traverses result sets returned by rawQuery SELECT statements."
    ],
    examTips: [
      "SQLiteOpenHelper requires onCreate() and onUpgrade() implementations.",
      "db.insert() returns -1 if the record insertion fails.",
      "Use cursor.moveToNext() inside a loop to fetch all records."
    ]
  },
  {
    id: 17,
    number: "05",
    title: "Notification Manager — Display Alert",
    category: "ANDROID",
    shortDescription: "Create a NotificationChannel and push system notifications.",
    aim: "To develop an Android application that creates and displays a notification using the Notification Manager.",
    algorithm: [
      "Check POST_NOTIFICATIONS runtime permission for Android 13+.",
      "Create NotificationChannel with channel ID, name, and importance level.",
      "Create a button click listener to trigger notifications.",
      "Build notification properties using NotificationCompat.Builder.",
      "Send notification through NotificationManager notify().",
      "Stop the application."
    ],
    code: `// MainActivity.java
package com.example.pro5;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    private static final String CHANNEL_ID = "demo_channel";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{android.Manifest.permission.POST_NOTIFICATIONS}, 101);
            }
        }

        createNotificationChannel();
        Button btnNotify = findViewById(R.id.notifyButton);
        btnNotify.setOnClickListener(v -> showNotification());
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Demo Channel";
            String description = "Channel for demo notifications";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void showNotification() {
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle("Hello from Notification Manager")
            .setContentText("This is your first notification!")
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true);

        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.notify(1, builder.build());
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="24dp">

    <Button
        android:id="@+id/notifyButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Trigger Alarm Notification" />

</LinearLayout>

<!-- AndroidManifest.xml (Permission Entry) -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>`,
    output: `[System Status Bar: Hello from Notification Manager]`,
    howItWorks: [
      "NotificationChannel is required for Android 8.0 (API 26) and above.",
      "NotificationCompat.Builder formats notification title, icon, and body text.",
      "NotificationManager.notify() posts the configured alert to system UI."
    ],
    examTips: [
      "NotificationChannel must be registered before showing notifications on API 26+.",
      "PendingIntent.FLAG_IMMUTABLE is required for target SDK 31+."
    ]
  },
  {
    id: 18,
    number: "06",
    title: "Threading — Start, Stop & Restart",
    category: "ANDROID",
    shortDescription: "Counter thread with Start, Stop, and Restart controls.",
    aim: "To develop an Android application that demonstrates threading by implementing a counter with Start, Stop, and Restart operations.",
    algorithm: [
      "Initialize counter variable to 0.",
      "Create Start, Stop, and Restart buttons in activity layout.",
      "When Start is clicked, spawn a background worker Thread.",
      "Sleep thread for 1 second, increment counter, and update UI via Handler.",
      "When Stop is clicked, change running state flag to halt loop.",
      "When Restart is clicked, reset counter to 0 and restart thread.",
      "Stop the application."
    ],
    code: `// MainActivity.java
package com.example.lab6;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private TextView textViewCounter;
    private Button buttonStart, buttonStop, buttonRestart;
    private Handler handler = new Handler();
    private Thread counterThread;
    private volatile boolean isRunning = false;
    private int counter = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textViewCounter = findViewById(R.id.textViewCounter);
        buttonStart = findViewById(R.id.buttonStart);
        buttonStop = findViewById(R.id.buttonStop);
        buttonRestart = findViewById(R.id.buttonRestart);

        buttonStart.setOnClickListener(v -> startCounter());
        buttonStop.setOnClickListener(v -> stopCounter());
        buttonRestart.setOnClickListener(v -> restartCounter());
    }

    private void startCounter() {
        if (isRunning) return;
        isRunning = true;
        counterThread = new Thread(() -> {
            while (isRunning) {
                final int currentCount = counter;
                handler.post(() -> textViewCounter.setText("count = " + currentCount));
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    break;
                }
                counter++;
            }
        });
        counterThread.start();
    }

    private void stopCounter() {
        isRunning = false;
    }

    private void restartCounter() {
        isRunning = false;
        counter = 0;
        textViewCounter.setText("count = 0");
        startCounter();
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="20dp">

    <TextView
        android:id="@+id/textViewCounter"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="count = 0"
        android:textSize="36sp"
        android:layout_marginBottom="20dp" />

    <Button
        android:id="@+id/buttonStart"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Start" />

    <Button
        android:id="@+id/buttonStop"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Stop" />

    <Button
        android:id="@+id/buttonRestart"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Restart" />

</LinearLayout>`,
    output: `count = 5\n\n[Start]  [Stop]  [Restart]`,
    howItWorks: [
      "Worker Thread executes looping counter off the main UI Thread.",
      "Handler.post() dispatches UI change tasks safely onto UI Thread.",
      "volatile boolean flag controls background loop execution state safely."
    ],
    examTips: [
      "Background threads cannot directly modify UI views; always use Handler.",
      "Thread.sleep(1000) creates a 1-second delay between count updates."
    ]
  },
  {
    id: 19,
    number: "07",
    title: "GPS Tracker — Get Current Location",
    category: "ANDROID",
    shortDescription: "Fetch device Latitude and Longitude using LocationManager.",
    aim: "To develop an Android application that obtains and displays the current GPS location of the device.",
    algorithm: [
      "Check for ACCESS_FINE_LOCATION runtime permission.",
      "If missing, request location permission from the user.",
      "Check whether GPS provider is enabled on device.",
      "Request location updates from LocationManager.",
      "Read latitude and longitude coordinates inside onLocationChanged().",
      "Display location in TextView and remove updates to save battery.",
      "Stop the application."
    ],
    code: `// MainActivity.java
package com.example.lab7;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements LocationListener {
    private TextView textViewLocation;
    private Button buttonGetLocation;
    private LocationManager locationManager;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textViewLocation = findViewById(R.id.textViewLocation);
        buttonGetLocation = findViewById(R.id.buttonGetLocation);
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        buttonGetLocation.setOnClickListener(v -> checkLocationPermissionAndGet());
    }

    private void checkLocationPermissionAndGet() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            fetchLocation();
        }
    }

    private void fetchLocation() {
        try {
            if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                textViewLocation.setText("Fetching location...");
                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);
            } else {
                Toast.makeText(this, "Please turn on your GPS!", Toast.LENGTH_SHORT).show();
            }
        } catch (SecurityException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onLocationChanged(@NonNull Location location) {
        double latitude = location.getLatitude();
        double longitude = location.getLongitude();
        textViewLocation.setText("Latitude:\n" + latitude + "\nLongitude: " + longitude);
        locationManager.removeUpdates(this);
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="20dp">

    <TextView
        android:id="@+id/textViewLocation"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Location: Not Available"
        android:textSize="18sp"
        android:gravity="center"
        android:layout_marginBottom="20dp" />

    <Button
        android:id="@+id/buttonGetLocation"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Get GPS Location" />

</LinearLayout>

<!-- AndroidManifest.xml (Permission Entries) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />`,
    output: `Latitude:\n37.421998333333335\nLongitude: -122.084`,
    howItWorks: [
      "LocationManager manages device location provider hardware.",
      "LocationListener interface handles location change callbacks.",
      "removeUpdates(this) unregisters listener once location is obtained."
    ],
    examTips: [
      "Declare ACCESS_FINE_LOCATION in AndroidManifest.xml.",
      "Always verify location permission at runtime before requesting updates."
    ]
  },
  {
    id: 20,
    number: "08",
    title: "Write Data to External Storage",
    category: "ANDROID",
    shortDescription: "Write user text to my_data.txt in external storage.",
    aim: "To develop an Android application that writes user-entered text into a file in external storage.",
    algorithm: [
      "Start application and load input layout.",
      "Read text string entered into EditText component.",
      "Check if external storage media state is Environment.MEDIA_MOUNTED.",
      "Get application external directory via getExternalFilesDir().",
      "Open FileOutputStream in append mode for target file my_data.txt.",
      "Write text bytes into file and display file path status.",
      "Stop the application."
    ],
    code: `// MainActivity.java
package com.example.pro8;

import android.os.Environment;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {
    private EditText etData;
    private Button btnWrite;
    private TextView tvStatus;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etData = findViewById(R.id.etData);
        btnWrite = findViewById(R.id.btnWrite);
        tvStatus = findViewById(R.id.tvStatus);

        btnWrite.setOnClickListener(v -> {
            String data = etData.getText().toString().trim();
            if (data.isEmpty()) {
                Toast.makeText(MainActivity.this, "Please enter some text", Toast.LENGTH_SHORT).show();
                return;
            }
            writeToFile(data);
        });
    }

    private void writeToFile(String data) {
        String state = Environment.getExternalStorageState();
        if (!Environment.MEDIA_MOUNTED.equals(state)) {
            tvStatus.setText("Status: External storage not available.");
            return;
        }

        File externalDir = getExternalFilesDir(null);
        File file = new File(externalDir, "my_data.txt");

        try (FileOutputStream fos = new FileOutputStream(file, true)) {
            fos.write((data + "\n").getBytes());
            tvStatus.setText("Status: Successfully written to:\n" + file.getAbsolutePath());
            etData.setText("");
            Toast.makeText(this, "Data saved successfully!", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            tvStatus.setText("Status: Error writing file - " + e.getMessage());
        }
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="24dp"
    android:gravity="center_horizontal">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="SD Card / External Storage Writer"
        android:textSize="18sp"
        android:textStyle="bold"
        android:layout_marginBottom="24dp" />

    <EditText
        android:id="@+id/etData"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter text to write..."
        android:inputType="textMultiLine"
        android:minLines="3"
        android:layout_marginBottom="16dp" />

    <Button
        android:id="@+id/btnWrite"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Write to File"
        android:layout_marginBottom="24dp" />

    <TextView
        android:id="@+id/tvStatus"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Status: Waiting for input..."
        android:textSize="14sp"
        android:textColor="@android:color/darker_gray" />

</LinearLayout>`,
    output: `Status: Successfully written to:\n/storage/emulated/0/Android/data/com.example.pro8/files/my_data.txt`,
    howItWorks: [
      "Environment.getExternalStorageState() verifies SD/external storage availability.",
      "getExternalFilesDir(null) accesses app-specific sandboxed directory.",
      "FileOutputStream with append = true preserves existing file contents."
    ],
    examTips: [
      "getExternalFilesDir() does not require explicit dangerous storage permissions on newer Android versions.",
      "Use try-with-resources to automatically close FileOutputStream."
    ]
  },
  {
    id: 21,
    number: "09",
    title: "Alert Message — AlertDialog",
    category: "ANDROID",
    shortDescription: "Display popup dialog alert on button click.",
    aim: "To develop an Android application that displays an alert message using an AlertDialog when a button is clicked.",
    algorithm: [
      "Start application and load main activity layout.",
      "Create Show Alert button in XML layout.",
      "Initialize Button reference in MainActivity using findViewById().",
      "Attach click listener to Button.",
      "Create AlertDialog.Builder instance.",
      "Set title, message, and OK positive button.",
      "Call show() to display AlertDialog on screen.",
      "Stop the application."
    ],
    code: `// MainActivity.java
package com.example.demo9;

import android.app.AlertDialog;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private Button btnAlert;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnAlert = findViewById(R.id.btnAlert);
        btnAlert.setOnClickListener(v -> {
            AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
            builder.setTitle("Alert Message");
            builder.setMessage("Welcome to Android Programming!");
            builder.setPositiveButton("OK", null);
            builder.show();
        });
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="24dp">

    <Button
        android:id="@+id/btnAlert"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show Alert" />

</LinearLayout>`,
    output: `[Dialog Box]\n\nAlert Message\nWelcome to Android Programming!\n\n[ OK ]`,
    howItWorks: [
      "AlertDialog.Builder constructs popup dialog overlays.",
      "setPositiveButton('OK', null) sets button action to dismiss dialog.",
      "show() displays dialog window on top of current activity."
    ],
    examTips: [
      "Pass Activity context (MainActivity.this) to AlertDialog.Builder.",
      "Use setNegativeButton() if you want to add a Cancel button."
    ]
  }
];

export default androidPrograms;