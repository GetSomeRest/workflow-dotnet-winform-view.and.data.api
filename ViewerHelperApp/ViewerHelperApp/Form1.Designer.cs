namespace ViwerSteps
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.button1 = new System.Windows.Forms.Button();
            this.label1_filename = new System.Windows.Forms.Label();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.richTextBox1 = new System.Windows.Forms.RichTextBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.button_status = new System.Windows.Forms.Button();
            this.label1_per = new System.Windows.Forms.Label();
            this.button_token = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.textBox1_key = new System.Windows.Forms.TextBox();
            this.textBox_Consumer_Secret = new System.Windows.Forms.TextBox();
            this.label2_Consumer_Secret = new System.Windows.Forms.Label();
            this.textBox_token = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(32, 163);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(196, 43);
            this.button1.TabIndex = 2;
            this.button1.Text = "Upload file";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // label1_filename
            // 
            this.label1_filename.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label1_filename.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label1_filename.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1_filename.Location = new System.Drawing.Point(246, 163);
            this.label1_filename.Name = "label1_filename";
            this.label1_filename.Size = new System.Drawing.Size(727, 43);
            this.label1_filename.TabIndex = 3;
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // richTextBox1
            // 
            this.richTextBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.richTextBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.richTextBox1.Location = new System.Drawing.Point(246, 286);
            this.richTextBox1.Name = "richTextBox1";
            this.richTextBox1.Size = new System.Drawing.Size(727, 318);
            this.richTextBox1.TabIndex = 5;
            this.richTextBox1.Text = "";
            // 
            // pictureBox1
            // 
            this.pictureBox1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox1.Location = new System.Drawing.Point(32, 286);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(196, 182);
            this.pictureBox1.TabIndex = 6;
            this.pictureBox1.TabStop = false;
            // 
            // button_status
            // 
            this.button_status.Location = new System.Drawing.Point(32, 225);
            this.button_status.Name = "button_status";
            this.button_status.Size = new System.Drawing.Size(196, 43);
            this.button_status.TabIndex = 7;
            this.button_status.Text = "Status";
            this.button_status.UseVisualStyleBackColor = true;
            this.button_status.Click += new System.EventHandler(this.button_status_Click);
            // 
            // label1_per
            // 
            this.label1_per.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label1_per.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label1_per.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1_per.Location = new System.Drawing.Point(246, 225);
            this.label1_per.Name = "label1_per";
            this.label1_per.Size = new System.Drawing.Size(727, 43);
            this.label1_per.TabIndex = 8;
            // 
            // button_token
            // 
            this.button_token.Location = new System.Drawing.Point(32, 107);
            this.button_token.Name = "button_token";
            this.button_token.Size = new System.Drawing.Size(196, 41);
            this.button_token.TabIndex = 9;
            this.button_token.Text = "Token";
            this.button_token.UseVisualStyleBackColor = true;
            this.button_token.Click += new System.EventHandler(this.button2_Click);
            // 
            // label1
            // 
            this.label1.Location = new System.Drawing.Point(109, 20);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(119, 22);
            this.label1.TabIndex = 10;
            this.label1.Text = "Consumer Key:";
            // 
            // textBox1_key
            // 
            this.textBox1_key.Location = new System.Drawing.Point(246, 20);
            this.textBox1_key.Name = "textBox1_key";
            this.textBox1_key.Size = new System.Drawing.Size(431, 22);
            this.textBox1_key.TabIndex = 11;
            // 
            // textBox_Consumer_Secret
            // 
            this.textBox_Consumer_Secret.Location = new System.Drawing.Point(246, 68);
            this.textBox_Consumer_Secret.Name = "textBox_Consumer_Secret";
            this.textBox_Consumer_Secret.Size = new System.Drawing.Size(431, 22);
            this.textBox_Consumer_Secret.TabIndex = 13;
            // 
            // label2_Consumer_Secret
            // 
            this.label2_Consumer_Secret.Location = new System.Drawing.Point(88, 68);
            this.label2_Consumer_Secret.Name = "label2_Consumer_Secret";
            this.label2_Consumer_Secret.Size = new System.Drawing.Size(140, 22);
            this.label2_Consumer_Secret.TabIndex = 12;
            this.label2_Consumer_Secret.Text = "Consumer Secret:";
            // 
            // textBox_token
            // 
            this.textBox_token.Location = new System.Drawing.Point(246, 116);
            this.textBox_token.Name = "textBox_token";
            this.textBox_token.Size = new System.Drawing.Size(431, 22);
            this.textBox_token.TabIndex = 14;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(998, 630);
            this.Controls.Add(this.textBox_token);
            this.Controls.Add(this.textBox_Consumer_Secret);
            this.Controls.Add(this.label2_Consumer_Secret);
            this.Controls.Add(this.textBox1_key);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.button_token);
            this.Controls.Add(this.label1_per);
            this.Controls.Add(this.button_status);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.richTextBox1);
            this.Controls.Add(this.label1_filename);
            this.Controls.Add(this.button1);
            this.Name = "Form1";
            this.Text = "Autodesk One viewer - .NET App";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label1_filename;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.RichTextBox richTextBox1;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Button button_status;
        private System.Windows.Forms.Label label1_per;
        private System.Windows.Forms.Button button_token;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBox1_key;
        private System.Windows.Forms.TextBox textBox_Consumer_Secret;
        private System.Windows.Forms.Label label2_Consumer_Secret;
        private System.Windows.Forms.TextBox textBox_token;

    }
}

