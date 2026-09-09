// androidPrograms.js

const androidPrograms = [
  // --- PRACTICAL 01 ---
  {
    id: 13,
    number: "01",
    title: "GUI Components — Font & Color",
    category: "ANDROID",
    shortDescription: "Dynamically adjust TextView text size and color cycling on button clicks.",
    aim: "To develop an Android application that alters the font size and color of a TextView dynamically using action buttons.",
    algorithm: [
      "Initialize MainActivity and bind UI elements (TextView, Button for font, Button for color).",
      "Define default text properties and state counters for tracking click interactions.",
      "Declare arrays containing target font sizes (float) and Color constants.",
      "Implement setOnClickListener on font button to cycle font sizes via modulo arithmetic.",
      "Implement setOnClickListener on color button to cycle color values via modulo arithmetic.",
      "Render updated text properties onto the screen dynamically upon each click."
    ],
    code: `// MainActivity.java
package com.example.lab01;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private TextView textView;
    private Button buttonFont, buttonColor;
    
    private int fontIndex = 0;
    private int colorIndex = 0;

    private final float[] fontSizes = { 20f, 24f, 28f, 32f, 36f };
    private final int[] colors = { Color.RED, Color.BLUE, Color.GREEN, Color.MAGENTA };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = findViewById(R.id.textView);
        buttonFont = findViewById(R.id.buttonFont);
        buttonColor = findViewById(R.id.buttonColor);

        buttonFont.setOnClickListener(v -> {
            fontIndex = (fontIndex + 1) % fontSizes.length;
            textView.setTextSize(fontSizes[fontIndex]);
        });

        buttonColor.setOnClickListener(v -> {
            colorIndex = (colorIndex + 1) % colors.length;
            textView.setTextColor(colors[colorIndex]);
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

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Welcome to Android Workspace"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        android:layout_marginBottom="32dp" />

    <Button
        android:id="@+id/buttonFont"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Change Font Size"
        android:layout_marginBottom="12dp" />

    <Button
        android:id="@+id/buttonColor"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Change Color" />

</LinearLayout>`,
    output: `Welcome to Android Workspace\n\n[Change Font Size]\n[Change Color]`,
    howItWorks: [
      "TextView holds initialized baseline text elements inside the user layout.",
      "Modulo calculation ((index + 1) % length) guarantees bounds safety while cycling array elements.",
      "setTextSize() and setTextColor() trigger layout redraws with updated visual parameters instantly."
    ],
    examTips: [
      "Use modulo % to prevent IndexOutOfBoundsException during cycling.",
      "Ensure float values (e.g., 20f) are passed to setTextSize()."
    ]
  },

  // --- PRACTICAL 02 ---
  {
    id: 14,
    number: "02",
    title: "Layout Manager — Student Form",
    category: "ANDROID",
    shortDescription: "Capture student details via form controls and display results on a secondary layout.",
    aim: "To develop an Android application utilizing layout components and Spinner dropdowns to accept and present student details.",
    algorithm: [
      "Set up layout containing EditTexts for Name/RegNo, Spinner for Department, and a Submit button.",
      "Initialize Spinner control using ArrayAdapter bound to an array of department names.",
      "Read form input strings when Submit button click event is fired.",
      "Instantiate a dynamic vertical LinearLayout containing formatted result TextViews.",
      "Re-render view context with setContentView(detailLayout) to present recorded entries."
    ],
    code: `// MainActivity.java
package com.example.lab02;

import android.graphics.Typeface;
import android.os.Bundle;
import android.view.Gravity;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private EditText editName, editRegNo;
    private Spinner spinnerDept;
    private Button btnSubmit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editName = findViewById(R.id.editName);
        editRegNo = findViewById(R.id.editRegNo);
        spinnerDept = findViewById(R.id.spinnerDept);
        btnSubmit = findViewById(R.id.btnSubmit);

        String[] departments = { "CS", "IT", "AIML", "ECE" };
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, departments);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerDept.setAdapter(adapter);

        btnSubmit.setOnClickListener(v -> renderResultView());
    }

    private void renderResultView() {
        String name = editName.getText().toString().trim();
        String regNo = editRegNo.getText().toString().trim();
        String dept = spinnerDept.getSelectedItem().toString();

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(40, 80, 40, 40);
        layout.setGravity(Gravity.CENTER_HORIZONTAL);

        TextView tvTitle = new TextView(this);
        tvTitle.setText("Registered Details\n");
        tvTitle.setTextSize(22);
        tvTitle.setTypeface(null, Typeface.BOLD);

        TextView tvDetails = new TextView(this);
        tvDetails.setText("Name: " + name + "\nReg No: " + regNo + "\nDepartment: " + dept);
        tvDetails.setTextSize(18);

        layout.addView(tvTitle);
        layout.addView(tvDetails);

        setContentView(layout);
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
        android:text="STUDENT REGISTRATION"
        android:textSize="20sp"
        android:textStyle="bold"
        android:layout_marginBottom="24dp" />

    <EditText
        android:id="@+id/editName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Student Name"
        android:layout_marginBottom="12dp" />

    <EditText
        android:id="@+id/editRegNo"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Register Number"
        android:layout_marginBottom="16dp" />

    <Spinner
        android:id="@+id/spinnerDept"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="24dp" />

    <Button
        android:id="@+id/btnSubmit"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Submit Form" />

</LinearLayout>`,
    output: `Registered Details\n\nName: Saravanan\nReg No: 211CS101\nDepartment: CS`,
    howItWorks: [
      "ArrayAdapter maps string array models to UI Spinner dropdown items.",
      "Input strings are safely extracted using getText().toString().trim().",
      "Dynamic view creation via Programmatic Java components allows interface swapping without extra XML activities."
    ],
    examTips: [
      "Remember ArrayAdapter instantiation requires context, layout style, and array data.",
      "Use trim() to sanitize empty spaces on text retrieval."
    ]
  },

  // --- PRACTICAL 03 ---
  {
    id: 15,
    number: "03",
    title: "Primitives — Draw Basic Shapes",
    category: "ANDROID",
    shortDescription: "Render graphical primitive shapes using Canvas drawing methods and Paint configurations.",
    aim: "To construct an Android application that renders custom graphical primitives (Line, Rectangle, Circle) on Canvas.",
    algorithm: [
      "Create custom DrawingView class extending fundamental Android View class.",
      "Initialize Paint object with appropriate stroke properties, anti-aliasing, and colors.",
      "Override onDraw(Canvas canvas) render callback method.",
      "Clear canvas background and draw custom primitives via drawLine(), drawRect(), and drawCircle().",
      "Inject custom DrawingView instance into Activity layout container dynamically."
    ],
    code: `// MainActivity.java
package com.example.lab03;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FrameLayout layout = findViewById(R.id.frameContainer);
        layout.addView(new GraphicsView(this));
    }

    private static class GraphicsView extends View {
        private final Paint paint = new Paint();

        public GraphicsView(Context context) {
            super(context);
            paint.setAntiAlias(true);
            paint.setStrokeWidth(6f);
        }

        @Override
        protected void onDraw(Canvas canvas) {
            super.onDraw(canvas);
            canvas.drawColor(Color.WHITE);

            // 1. Draw Line
            paint.setColor(Color.BLUE);
            canvas.drawLine(100, 100, 500, 100, paint);

            // 2. Draw Rectangle
            paint.setColor(Color.RED);
            canvas.drawRect(100, 180, 400, 380, paint);

            // 3. Draw Circle
            paint.setColor(Color.GREEN);
            canvas.drawCircle(250, 550, 100, paint);
        }
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/frameContainer"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`,
    output: `[Canvas Canvas Output: Blue Line, Red Rectangle, Green Circle]`,
    howItWorks: [
      "Custom GraphicsView overrides onDraw() to issue direct GPU canvas instructions.",
      "Paint defines styling metadata like color values, rendering mode, and stroke width.",
      "Canvas executes native coordinates rendering directly on layout render."
    ],
    examTips: [
      "drawLine(startX, startY, stopX, stopY, paint).",
      "drawRect(left, top, right, bottom, paint).",
      "drawCircle(centerX, centerY, radius, paint)."
    ]
  },

  // --- PRACTICAL 04 ---
  {
    id: 16,
    number: "04",
    title: "Database — SQLite Student Data",
    category: "ANDROID",
    shortDescription: "Insert and fetch student records using SQLite Database integration.",
    aim: "To build an Android application capable of inserting and querying student data entries via local SQLite DB.",
    algorithm: [
      "Construct SQLiteOpenHelper helper class specifying table columns (id, name, marks).",
      "Implement onCreate() to execute SQL table creation statement.",
      "Provide helper methods insertData() and getAllData() for DB operations.",
      "Bind Activity input fields to trigger record insertion using ContentValues.",
      "Query DB via rawQuery(), extract results using Cursor, and present records in an AlertDialog."
    ],
    code: `// DatabaseHelper.java
package com.example.lab04;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHelper extends SQLiteOpenHelper {
    private static final String DB_NAME = "student.db";
    private static final String TABLE_NAME = "students";

    public DatabaseHelper(Context context) {
        super(context, DB_NAME, null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE " + TABLE_NAME + " (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, MARKS INTEGER)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
        onCreate(db);
    }

    public boolean insertStudent(String name, int marks) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("NAME", name);
        values.put("MARKS", marks);
        return db.insert(TABLE_NAME, null, values) != -1;
    }

    public Cursor fetchStudents() {
        SQLiteDatabase db = this.getWritableDatabase();
        return db.rawQuery("SELECT * FROM " + TABLE_NAME, null);
    }
}

// MainActivity.java
package com.example.lab04;

import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private DatabaseHelper dbHelper;
    private EditText editName, editMarks;
    private Button btnAdd, btnView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dbHelper = new DatabaseHelper(this);
        editName = findViewById(R.id.editName);
        editMarks = findViewById(R.id.editMarks);
        btnAdd = findViewById(R.id.btnAdd);
        btnView = findViewById(R.id.btnView);

        btnAdd.setOnClickListener(v -> {
            String name = editName.getText().toString().trim();
            String marksStr = editMarks.getText().toString().trim();

            if (name.isEmpty() || marksStr.isEmpty()) return;

            boolean inserted = dbHelper.insertStudent(name, Integer.parseInt(marksStr));
            Toast.makeText(this, inserted ? "Success" : "Failed", Toast.LENGTH_SHORT).show();
            if (inserted) { editName.setText(""); editMarks.setText(""); }
        });

        btnView.setOnClickListener(v -> {
            Cursor cursor = dbHelper.fetchStudents();
            if (cursor.getCount() == 0) {
                showAlert("Database Status", "No records found.");
                return;
            }
            StringBuilder builder = new StringBuilder();
            while (cursor.moveToNext()) {
                builder.append("ID: ").append(cursor.getInt(0)).append("\n");
                builder.append("Name: ").append(cursor.getString(1)).append("\n");
                builder.append("Marks: ").append(cursor.getInt(2)).append("\n\n");
            }
            showAlert("Student Records", builder.toString());
        });
    }

    private void showAlert(String title, String message) {
        new AlertDialog.Builder(this)
            .setTitle(title)
            .setMessage(message)
            .setPositiveButton("OK", null)
            .show();
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="24dp">

    <EditText
        android:id="@+id/editName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Student Name" />

    <EditText
        android:id="@+id/editMarks"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Student Marks"
        android:inputType="number"
        android:layout_marginBottom="16dp" />

    <Button
        android:id="@+id/btnAdd"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Add Record" />

    <Button
        android:id="@+id/btnView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="View All Records" />

</LinearLayout>`,
    output: `Student Records\n\nID: 1\nName: Saravanan\nMarks: 95`,
    howItWorks: [
      "SQLiteOpenHelper creates database schemas and manages connection instances.",
      "ContentValues wraps key-value field structures required for inserting DB tuples.",
      "Cursor iterates through query result sets using cursor.moveToNext()."
    ],
    examTips: [
      "db.insert() returns row ID on success or -1 if an insertion error occurs.",
      "Always check cursor.getCount() == 0 before starting string builder extraction."
    ]
  },

  // --- PRACTICAL 05 ---
  {
    id: 17,
    number: "05",
    title: "Notification Manager — Display Alert",
    category: "ANDROID",
    shortDescription: "Construct NotificationChannel and trigger system status bar alerts.",
    aim: "To implement an Android application that configures a NotificationChannel and fires alerts using NotificationManager.",
    algorithm: [
      "Check and request POST_NOTIFICATIONS runtime permission for modern Android API support.",
      "Instantiate NotificationChannel with required channel ID, title, and importance parameters.",
      "Register created NotificationChannel with system NotificationManager.",
      "Configure NotificationCompat.Builder detailing title, body, icon, and PendingIntent.",
      "Dispatch notification using notificationManager.notify()."
    ],
    code: `// MainActivity.java
package com.example.lab05;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

public class MainActivity extends AppCompatActivity {
    private static final String CHANNEL_ID = "lab_channel";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{ android.Manifest.permission.POST_NOTIFICATIONS }, 101);
            }
        }

        setupNotificationChannel();

        Button btnNotify = findViewById(R.id.btnNotify);
        btnNotify.setOnClickListener(v -> triggerNotification());
    }

    private void setupNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Lab Notifications",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) manager.createNotificationChannel(channel);
        }
    }

    private void triggerNotification() {
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, intent, PendingIntent.FLAG_IMMUTABLE
        );

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle("Lab Workspace Alert")
            .setContentText("Notification service executed successfully.")
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true);

        NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        if (manager != null) manager.notify(1, builder.build());
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:padding="24dp">

    <Button
        android:id="@+id/btnNotify"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Trigger System Notification" />

</LinearLayout>

<!-- AndroidManifest.xml (Permission Entry) -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>`,
    output: `[Status Bar Alert: Lab Workspace Alert - Notification service executed successfully.]`,
    howItWorks: [
      "NotificationChannel initialization is required on API level 26+ devices.",
      "NotificationCompat.Builder structures system notification attributes.",
      "NotificationManager.notify() posts the built notification to the status bar."
    ],
    examTips: [
      "Specify PendingIntent.FLAG_IMMUTABLE to meet target API safety standards.",
      "Declare POST_NOTIFICATIONS in AndroidManifest.xml for Android 13+ devices."
    ]
  },

  // --- PRACTICAL 06 ---
  {
    id: 18,
    number: "06",
    title: "Threading — Start, Stop & Restart",
    category: "ANDROID",
    shortDescription: "Multithreaded counter executing async updates safely via Handler UI posting.",
    aim: "To build an Android application demonstrating multithreading using background worker threads, Handler, and atomic state flags.",
    algorithm: [
      "Instantiate Handler object to enable safe communication across threads.",
      "Start counter thread on 'Start' button click, executing continuous loops with 1-second delays.",
      "Use Handler.post() inside the thread loop to safely update UI text view.",
      "Halt background thread loop safely on 'Stop' click by toggling a volatile boolean flag.",
      "Reset counter value to zero and re-run execution thread on 'Restart' click."
    ],
    code: `// MainActivity.java
package com.example.lab06;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private TextView tvCounter;
    private Button btnStart, btnStop, btnRestart;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private volatile boolean isRunning = false;
    private int count = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvCounter = findViewById(R.id.tvCounter);
        btnStart = findViewById(R.id.btnStart);
        btnStop = findViewById(R.id.btnStop);
        btnRestart = findViewById(R.id.btnRestart);

        btnStart.setOnClickListener(v -> startThread());
        btnStop.setOnClickListener(v -> isRunning = false);
        btnRestart.setOnClickListener(v -> restartThread());
    }

    private void startThread() {
        if (isRunning) return;
        isRunning = true;

        new Thread(() -> {
            while (isRunning) {
                final int current = count;
                mainHandler.post(() -> tvCounter.setText("Count: " + current));
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    break;
                }
                count++;
            }
        }).start();
    }

    private void restartThread() {
        isRunning = false;
        count = 0;
        tvCounter.setText("Count: 0");
        startThread();
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

    <TextView
        android:id="@+id/tvCounter"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Count: 0"
        android:textSize="32sp"
        android:textStyle="bold"
        android:layout_marginBottom="24dp" />

    <Button
        android:id="@+id/btnStart"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Start Counter" />

    <Button
        android:id="@+id/btnStop"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Stop Counter" />

    <Button
        android:id="@+id/btnRestart"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Restart Counter" />

</LinearLayout>`,
    output: `Count: 8\n\n[Start Counter]\n[Stop Counter]\n[Restart Counter]`,
    howItWorks: [
      "Worker Threads manage background execution loops without freezing main thread operations.",
      "Handler.post() dispatches UI updates back onto the Main Looper Thread safely.",
      "volatile keyword ensures variable visibility across parallel threads."
    ],
    examTips: [
      "Never modify UI elements directly inside background threads.",
      "Use volatile booleans for thread-safe state toggling."
    ]
  },

  // --- PRACTICAL 07 ---
  {
    id: 19,
    number: "07",
    title: "GPS Tracker — Get Current Location",
    category: "ANDROID",
    shortDescription: "Fetch geographic coordinates using device LocationManager hardware.",
    aim: "To build an Android application retrieving and displaying precise device GPS Latitude and Longitude metrics.",
    algorithm: [
      "Check ACCESS_FINE_LOCATION permission state at runtime.",
      "Request location permissions if access is not yet granted.",
      "Initialize LocationManager and verify that GPS hardware provider is active.",
      "Request location updates using LocationManager.requestLocationUpdates().",
      "Process coordinates inside onLocationChanged() callback and display results on screen."
    ],
    code: `// MainActivity.java
package com.example.lab07;

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
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

public class MainActivity extends AppCompatActivity implements LocationListener {
    private TextView tvLocation;
    private LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvLocation = findViewById(R.id.tvLocation);
        Button btnGet = findViewById(R.id.btnGetLocation);
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        btnGet.setOnClickListener(v -> fetchLocation());
    }

    private void fetchLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{ Manifest.permission.ACCESS_FINE_LOCATION }, 100);
            return;
        }

        if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            tvLocation.setText("Acquiring GPS Signal...");
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 1, this);
        } else {
            Toast.makeText(this, "Enable GPS hardware in settings", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onLocationChanged(@NonNull Location location) {
        tvLocation.setText("Latitude: " + location.getLatitude() + "\nLongitude: " + location.getLongitude());
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
    android:padding="24dp">

    <TextView
        android:id="@+id/tvLocation"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Location: Unavailable"
        android:textSize="18sp"
        android:gravity="center"
        android:layout_marginBottom="24dp" />

    <Button
        android:id="@+id/btnGetLocation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Fetch Current GPS Location" />

</LinearLayout>

<!-- AndroidManifest.xml (Permissions) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />`,
    output: `Latitude: 11.0168\nLongitude: 76.9558`,
    howItWorks: [
      "LocationManager coordinates data acquisition from underlying GPS hardware.",
      "LocationListener interface fires onLocationChanged() when new coordinates are resolved.",
      "removeUpdates(this) detaches listeners to conserve battery power once data is acquired."
    ],
    examTips: [
      "Declare ACCESS_FINE_LOCATION permission inside AndroidManifest.xml.",
      "Unregister listeners via removeUpdates() after fetching location coordinates."
    ]
  },

  // --- PRACTICAL 08 ---
  {
    id: 20,
    number: "08",
    title: "Write Data to External Storage",
    category: "ANDROID",
    shortDescription: "Write user-entered text into app-specific external storage text files.",
    aim: "To build an Android application capable of writing user text data into files stored within external storage space.",
    algorithm: [
      "Verify external storage state using Environment.getExternalStorageState().",
      "Confirm media availability equals Environment.MEDIA_MOUNTED.",
      "Retrieve app-specific directory via getExternalFilesDir(null).",
      "Instantiate FileOutputStream in append mode (true) targeting my_data.txt.",
      "Write data bytes using try-with-resources and present operation output path."
    ],
    code: `// MainActivity.java
package com.example.lab08;

import android.os.Bundle;
import android.os.Environment;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {
    private EditText editInput;
    private TextView tvStatus;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editInput = findViewById(R.id.editInput);
        tvStatus = findViewById(R.id.tvStatus);
        Button btnSave = findViewById(R.id.btnSave);

        btnSave.setOnClickListener(v -> saveToExternalFile());
    }

    private void saveToExternalFile() {
        String input = editInput.getText().toString().trim();
        if (input.isEmpty()) return;

        if (!Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())) {
            tvStatus.setText("Storage Unavailable");
            return;
        }

        File targetFile = new File(getExternalFilesDir(null), "my_data.txt");

        try (FileOutputStream fos = new FileOutputStream(targetFile, true)) {
            fos.write((input + "\n").getBytes());
            tvStatus.setText("File Location:\n" + targetFile.getAbsolutePath());
            editInput.setText("");
            Toast.makeText(this, "Saved successfully!", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            tvStatus.setText("Error writing file: " + e.getMessage());
        }
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="24dp">

    <EditText
        android:id="@+id/editInput"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Type text to store in file..."
        android:minLines="3"
        android:layout_marginBottom="16dp" />

    <Button
        android:id="@+id/btnSave"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Save to External File"
        android:layout_marginBottom="16dp" />

    <TextView
        android:id="@+id/tvStatus"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Status: Ready"
        android:textSize="12sp" />

</LinearLayout>`,
    output: `Status: Saved successfully!\nFile Location:\n/storage/emulated/0/Android/data/com.example.lab08/files/my_data.txt`,
    howItWorks: [
      "Environment.getExternalStorageState() checks SD card mount status.",
      "getExternalFilesDir(null) references isolated application storage paths.",
      "FileOutputStream(file, true) appends data stream entries without overwriting existing file content."
    ],
    examTips: [
      "getExternalFilesDir() does not require runtime permissions on API 19+.",
      "Use try-with-resources to automatically close I/O file streams."
    ]
  },

  // --- PRACTICAL 09 ---
  {
    id: 21,
    number: "09",
    title: "Alert Message — AlertDialog",
    category: "ANDROID",
    shortDescription: "Display modal alert popup windows on user button interactions.",
    aim: "To implement an Android application displaying modal alert messages using AlertDialog.Builder.",
    algorithm: [
      "Bind layout trigger Button reference using findViewById().",
      "Attach setOnClickListener event handler to button.",
      "Instantiate AlertDialog.Builder passing Activity context.",
      "Set title, message content, and positive action button properties.",
      "Call builder.show() to render popup modal overlay."
    ],
    code: `// MainActivity.java
package com.example.lab09;

import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnShowAlert = findViewById(R.id.btnShowAlert);

        btnShowAlert.setOnClickListener(v -> {
            new AlertDialog.Builder(MainActivity.this)
                .setTitle("Alert Message")
                .setMessage("Welcome to Android Lab Workspace!")
                .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                .show();
        });
    }
}

<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:padding="24dp">

    <Button
        android:id="@+id/btnShowAlert"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Display Alert Message" />

</LinearLayout>`,
    output: `[Modal Dialog Overlay]\n\nAlert Message\nWelcome to Android Lab Workspace!\n\n[ OK ]`,
    howItWorks: [
      "AlertDialog.Builder constructs popup window overlays on top of active activities.",
      "setPositiveButton() defines action handlers for user confirmations.",
      "show() renders the configured dialog model onto the screen view."
    ],
    examTips: [
      "Always pass valid Activity context (e.g., MainActivity.this) to the builder.",
      "Chain method calls (.setTitle().setMessage().show()) for concise syntax."
    ]
  }
];

export default androidPrograms;